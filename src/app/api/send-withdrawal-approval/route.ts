import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render, pretty } from "@react-email/render";
import WithdrawalApprovalEmail from "emails/withdrawal-approval-email";

const resend = new Resend(process.env.RESEND_NOTIFICATIONS_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, name, amount, coin, transactionReference, date } =
      await req.json();

    if (!email || !name || !amount || !coin || !transactionReference || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const html = await pretty(
      await render(
        WithdrawalApprovalEmail({
          name,
          amount,
          coin,
          transactionReference,
          date,
        }),
      ),
    );

    await resend.emails.send({
      from: "Quantum Global System <team@notifications.quantumglobal-system.com>",
      to: email,
      subject: "Withdrawal Approved",
      html,
    });

    return NextResponse.json(
      {
        message: "Withdrawal approval email sent successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error sending withdrawal approval email:", error);
    return NextResponse.json(
      {
        message: "Failed to send withdrawal approval email",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
