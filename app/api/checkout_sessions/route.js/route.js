import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

/**
 * Handles an HTTP POST request to create a subscription-based Stripe Checkout session.
 *
 * This asynchronous function retrieves the origin of the request from the headers and extracts the price ID from the JSON payload.
 * It then creates a checkout session with a single line item configured for a subscription using the Stripe API.
 * On success, the function responds with a 303 redirect to the session URL. If an error occurs during the process,
 * it returns a JSON response containing the error message along with an appropriate HTTP status code.
 *
 * @async
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object, either redirecting the client to the
 *                                  checkout session URL or providing a JSON error response.
 */
export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const request = await req.json()
    const { priceId } = request

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
