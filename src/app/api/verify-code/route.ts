import { NextRequest, NextResponse } from "next/server";
import { initAdmin } from "@/lib/firebase-admin";
import * as admin from "firebase-admin";

export async function POST(req: NextRequest) {
  const { uid, code } = await req.json();
  const { adminDb } = initAdmin();

  if (!uid || !code) {
    return NextResponse.json(
      { error: "UID and code are required" },
      { status: 400 },
    );
  }

  try {
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
    const storedAuth = userData.verificationCode;

    if (!storedAuth || !storedAuth.code) {
      return NextResponse.json(
        { error: "No verification code requesting" },
        { status: 400 },
      );
    }

    // Check expiration
    if (Date.now() > storedAuth.expiresAt) {
      return NextResponse.json(
        { error: "Verification code expired" },
        { status: 400 },
      );
    }

    // Check code match
    if (storedAuth.code !== code) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 },
      );
    }

    // Verification Success
    await userDoc.ref.update({
      isAccountVerified: true,
      verificationCode: admin.firestore.FieldValue.delete(), // Remove the code field
    });

    // Note: I need to import admin to use FieldValue.delete() but initAdmin returns instances.
    // I should check how to get FieldValue from firebase-admin in this project.
    // Usually it's import * as admin from 'firebase-admin'; admin.firestore.FieldValue.delete().
    // I'll update the file to include the import.

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error verifying code:", error);
    return NextResponse.json(
      { error: "Failed to verify code" },
      { status: 500 },
    );
  }
}
