import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/configs/schema';

const connectionString = process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING!;
const client = postgres(connectionString);
export const db = drizzle(client, { schema }); 