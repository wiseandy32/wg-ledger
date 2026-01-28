import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render, pretty } from "@react-email/render";
import { initAdmin } from "@/lib/firebase-admin";
import ForgotPasswordEmail from "emails/forgot-password-email";
console.log("Resend key:", process.env.RESEND_API_KEY ? "Loaded" : "Missing");

const resend = new Resend(process.env.RESEND_API_KEY);

const actionCodeSettings = {
  url: "https://www.worldquantumnetwork.com/login",
};

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const { auth } = initAdmin();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const resetLink = await auth.generatePasswordResetLink(
      email,
      actionCodeSettings,
    );

    console.error("Generated reset link:", resetLink);

    const html = await pretty(await render(ForgotPasswordEmail({ resetLink })));

    await resend.emails.send({
      from: "World Quantum Network <admin@worldquantumnetwork.com>",
      to: email,
      subject: "Reset Your Password",
      html,
    });

    return NextResponse.json(
      {
        message: "A Password reset link has been sent to your email",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error sending password reset email:", error);
    return NextResponse.json(
      {
        message:
          "Failed to send password reset link. Please make sure you have an account with the provided email.",
      },
      { status: 500 },
    );
  }
}
