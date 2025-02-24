import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    const stripe = new Stripe("sk_test_51NJuBOFbMO6lw4GnGIadzpoj9Is2uWRVx4d0R0aEuBuwBfdng1BlmxyGLwo7eNt3l22qKGRUocg9zbR0Q8aol054001h8Oz3nk");

    const webhookSecret: string = "whsec_a052d09fdd11e59b6cc4d836f1e130c8d0d95f541be8822495075845feabdc4c";

    if (req.method === 'POST') {
        const sig = req.headers['stripe-signature'];

        let event: Stripe.Event;

        try {
            const body = await buffer(req);
            event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
        } catch (err) {
            // On error, log and return the error message
            console.log(`❌ Error message: ${err.message}`);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Successfully constructed event
        console.log('✅ Success:', event.id);

        // Cast event data to Stripe object
        if (event.type === 'payment_intent.succeeded') {
            const stripeObject: Stripe.PaymentIntent = event.data
                .object as Stripe.PaymentIntent;
            console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
        } else if (event.type === 'charge.succeeded') {
            const charge = event.data.object as Stripe.Charge;
            console.log(`💵 Charge id: ${charge.id}`);
        } else {
            console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        }

        // Return a response to acknowledge receipt of the event
        res.json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
};

export const config = {
    api: {
        bodyParser: false,
    },
};

const buffer = (req: NextApiRequest) => {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];

        req.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            resolve(Buffer.concat(chunks));
        });

        req.on('error', reject);
    });
};

export default handler;
