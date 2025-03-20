// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// export const config = {
//     api: {
//         bodyParser: false, // Disables body parsing
//     },
// };

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
// const rawBody = await req.text();
// const sig = req.headers.get("stripe-signature");


// try {
//     const event = stripe.webhooks.constructEvent(
//       rawBody,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );

//     console.log("Stripe Event Received:", event.type);

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       console.log("Payment successful for:", session.customer_email);
//       // TODO: Update database with payment details
//       console.log("Payment successful for:", session.customer_email);
//       // TODO: Update database with payment details
//     }

//     return new NextResponse("Webhook received", { status: 200 });
//   } catch (err) {
//     console.error("Webhook signature verification failed.", err.message);
//     return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
//   }
// }
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Handle successful payment
        break;
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Handle successful payment
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }
}
