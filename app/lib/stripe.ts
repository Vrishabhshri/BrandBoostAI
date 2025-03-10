import 'server-only'

import Stripe from 'stripe'

const stripeSecretKey = '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'
if (!stripeSecretKey) {
  throw new Error("Missing Stripe secret key");
}

export const stripe = new Stripe(stripeSecretKey)
