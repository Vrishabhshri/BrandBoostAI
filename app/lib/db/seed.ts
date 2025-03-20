import { stripe } from '../payments/stripe';
import { db } from './drizzle';
import { users, teams, teamMembers } from './schema';
import { hashPassword } from '../auth/session';

async function createStripeProducts() {
    console.log('Creating Stripe products and prices...');

    const basicProduct = await stripe.products.create({
        name: 'Basic',
        description: 'Basic subscription plan',
    });

    await stripe.prices.create({
        product: basicProduct.id,
        unit_amount: 2000, // $20 in cents
        currency: 'usd',
        recurring: {
            interval: 'month',
            trial_period_days: 7,
        },
    });

    const plusProduct = await stripe.products.create({
        name: 'Plus',
        description: 'Plus subscription plan',
    });

    await stripe.prices.create({
        product: plusProduct.id,
        unit_amount: 10000, // $100 in cents
        currency: 'usd',
        recurring: {
            interval: 'month',
            trial_period_days: 7,
        },
    });
    const proProduct = await stripe.products.create({
        name: 'Pro',
        description: 'Pro subscription plan',
    });

    await stripe.prices.create({
        product: proProduct.id,
        unit_amount: 50000, // $500 in cents
        currency: 'usd',
        recurring: {
            interval: 'month',
            trial_period_days: 7,
        },
    });

    console.log('Stripe products and prices created successfully.');
}

async function seed() {
    const email = 'test@test.com';
    const password = 'Music@123';
    const passwordHash = await hashPassword(password);

    const [user] = await db
        .insert(users)
        .values([
            {
                email: email,
                passwordHash: passwordHash,
                role: "owner",
            },
        ])
        .returning();

    console.log('Initial user created.');

    const [team] = await db
        .insert(teams)
        .values({
            name: 'Test Team',
        })
        .returning();

    await db.insert(teamMembers).values({
        teamId: team.id,
        userId: user.id,
        role: 'owner',
    });

    await createStripeProducts();
}

seed()
    .catch((error) => {
        console.error('Seed process failed:', error);
        process.exit(1);
    })
    .finally(() => {
        console.log('Seed process finished. Exiting...');
        process.exit(0);
    });
