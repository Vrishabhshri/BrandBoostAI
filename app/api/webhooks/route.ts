import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    const STRIPE = new Stripe("sk_test_51NJuBOFbMO6lw4GnGIadzpoj9Is2uWRVx4d0R0aEuBuwBfdng1BlmxyGLwo7eNt3l22qKGRUocg9zbR0Q8aol054001h8Oz3nk");
    const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

    if (req.method === 'POST') {

        let event: Stripe.Event;

        try {
            const sig = req.headers['stripe-signature'];
            // const body = await buffer(req);
            event = STRIPE.webhooks.constructEvent(
                req.body,
                sig as string,
                STRIPE_ENDPOINT_SECRET
            );
        } catch (error: any) {
            // On error, log and return the error message
            console.log(`❌ Error message: `, error);
            return res.status(400).send(`Webhook Error: ${error.message}`);
        }

        if (event.type === "checkout.session.completed") {
            const order = await Order.findById(event.data.object.metadata?.orderId);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            order.totalAmount = event.data.object.amount_total;
            order.status = "paid";

            await order.save();

        }
        res.status(200).send();
    }
        // Return a response to acknowledge receipt of the event
        res.json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
        }

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
