import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING!);

export { db };
// "use server"


// const connectionString = process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING;
// let pool;

// if (!connectionString) {
//   throw new Error("DATABASE_URL is not defined");
// }
// else {
//     pool = new Pool({
//         connectionString: connectionString,
//         ssl: true,
//     });
// }

// export const db = drizzle(pool);
