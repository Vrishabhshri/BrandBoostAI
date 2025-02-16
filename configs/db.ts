import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING!); // Assert that it is not undefined

export { db };
