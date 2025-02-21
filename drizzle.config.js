import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.ts",
  dbCredentials:{
    url: process.env.local.NEXT_PUBLIC_DATABASE_CONNECTION_STRING  }
});