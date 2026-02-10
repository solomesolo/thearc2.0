import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source, ts, region } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // TODO: Store in your database or email service
    // For now, we'll just log it (in production, use your DB or service like ConvertKit/Mailchimp)
    console.log("Waitlist signup:", {
      email,
      source,
      ts,
      region,
    });

    // In production, you would:
    // 1. Store in database
    // 2. Or send to email service (ConvertKit, Mailchimp, etc.)
    // 3. Or use a service like Resend to send confirmation email

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

