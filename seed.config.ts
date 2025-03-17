import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_API_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

async function seedDatabase() {
  console.log("Seeding database...");

  // Insert example users
  const { error: userError } = await supabase.from('users').upsert([
    { id: 'user_1', email: 'admin@brandboostr.com', role: 'admin' },
    { id: 'user_2', email: 'user@brandboostr.com', role: 'user' }
  ]);

  if (userError) {
    console.error("Error seeding users:", userError);
  } else {
    console.log("Users seeded successfully.");
  }

  // Insert example products (if using Stripe)
  const { error: productError } = await supabase.from('products').upsert([
    { id: 'product_1', name: 'Subscription Plan A', price: 19.99 },
    { id: 'product_2', name: 'Subscription Plan B', price: 49.99 }
  ]);

  if (productError) {
    console.error("Error seeding products:", productError);
  } else {
    console.log("Products seeded successfully.");
  }

  console.log("Seeding complete.");
}

seedDatabase().catch(console.error);
