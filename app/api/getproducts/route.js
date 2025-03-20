import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Force this API route to be dynamic

export async function GET(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const prices = await stripe.prices.list({
        limit: 3,
    });

    return NextResponse.json(prices.data.reverse());
}
