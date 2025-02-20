import { integer, pgTable, serial, varchar, timestamp, json, text } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  business: varchar("business").notNull(),
  credits: integer("credits").default(3).notNull()
});

export const USERS = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  business: text("business").notNull(),
  credits: integer("credits").default(3).notNull(),
  email: text("email").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  subscriptionStatus: text("subscription_status").default("Null"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const FILES_TABLE = pgTable("files", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => USER_TABLE.id).notNull(),
  fileName: varchar("file_name").notNull(),
  fileContent: json("file_content").notNull(),
  fileType: varchar("file_type").default('competitor').notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  description: text("description")
});


export const PAYMENTS = pgTable("payments", {
  id: serial("id").primaryKey(),
  stripePaymentId: text("stripe_payment_id").unique().notNull(),
  userId: integer("user_id").references(() => USERS.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull(),
  status: text("status").notNull(), // Ex: "succeeded"
  createdAt: timestamp("created_at").defaultNow(),
});

export const WEBHOOKS = pgTable("webhooks", {
  id: serial("id").primaryKey(),
  event_type: text("event_type").notNull(), 
  stripe_event_id: text("stripe_event_id").unique().notNull(),
  payload: text("payload").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});