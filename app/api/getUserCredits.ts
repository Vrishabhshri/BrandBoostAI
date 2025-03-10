import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.query;

    // Ensure email is a string
    const emailString = Array.isArray(email) ? email[0] : email;

    if (!emailString) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const result = await db
            .select()
            .from(USER_TABLE)
            .where(eq(USER_TABLE.email, emailString));

        if (result?.length > 0) {
            return res.status(200).json({ credits: result[0].credits });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
} 
