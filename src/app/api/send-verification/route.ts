import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render, pretty } from "@react-email/render";
import { initAdmin } from "@/lib/firebase-admin";
import VerificationEmail from "../../../../emails/verification-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, uid } = await req.json();
  const { adminDb } = initAdmin();

  if (!email || !uid) {
    return NextResponse.json(
      { error: "Email and UID are required" },
      { status: 400 },
    );
  }

  try {
    const userRef = adminDb.collection("users").doc(uid); // Assuming doc ID is username or we use querying.
    // Wait, the Register.jsx logic uses `setDataToDb("users", username, user)`.
    // So the document ID in `users` collection is the `username`.
    // But `uid` is usually the Firebase Auth UID.
    // Let's verify Register.jsx again.
    // Register.jsx: `await setDataToDb("users", username, user);`
    // So if the frontend passes `uid`, I might not find the document if I look up by `uid` directly if the doc ID is `username`.
    // However, the `user` object in `Register.jsx` has `uid` field.
    // I should query by `uid` field if I don't have the username, OR the frontend should pass the username (userDocRef).

    // Let's assume for now I should look up by `uid` field to be safe, or just ask frontend to pass the docId (username).
    // Better to query by UID to find the doc reference.

    const snapshot = await adminDb
      .collection("users")
      .where("uid", "==", uid)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Rate limit check
    if (userData.verificationCode?.lastSentAt) {
      const lastSent = userData.verificationCode.lastSentAt.toDate
        ? userData.verificationCode.lastSentAt.toDate()
        : new Date(userData.verificationCode.lastSentAt);
      const timeDiff = Date.now() - lastSent.getTime();
      if (timeDiff < 60000) {
        return NextResponse.json(
          { error: "Please wait 60 seconds before resending" },
          { status: 429 },
        );
      }
    }

    // Generate Code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Update Firestore
    await userDoc.ref.update({
      verificationCode: {
        code: verificationCode,
        expiresAt: expiresAt,
        lastSentAt: Date.now(),
      },
    });

    // Send Email
    const html = await pretty(
      await render(VerificationEmail({ verificationCode })),
    );

    await resend.emails.send({
      from: "World Quantum Network <admin@worldquantumnetwork.com>",
      to: email,
      subject: "Verify Your Email Address",
      html,
    });

    return NextResponse.json(
      { message: "Verification code sent" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 },
    );
  }
}
