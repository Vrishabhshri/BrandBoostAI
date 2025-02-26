import { NextResponse } from "next/server";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing to handle raw webhook data
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const rawBody = await req.text(); // Read raw request body
    const sig = req.headers.get("stripe-signature");

    // Construct the event using Stripe's webhook verification
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("Stripe Event Received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Payment successful for:", session.customer_email);
      // TODO: Implement logic to update the database with payment details
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook error: ${err.message}` },
      { status: 400 }
    );
  }
}
