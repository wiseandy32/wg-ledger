import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render, pretty } from "@react-email/render";
import WelcomeEmail from "emails/welcome-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const html = await pretty(await render(WelcomeEmail({ name })));

    await resend.emails.send({
      from: "World Quantum Network <admin@worldquantumnetwork.com>",
      to: email,
      subject: "Welcome to World Quantum Network",
      html,
    });

    return NextResponse.json(
      {
        message: "Welcome email sent successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return NextResponse.json(
      {
        message: "Failed to send welcome email",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
