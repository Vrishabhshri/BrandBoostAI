import { integer, pgTable, serial, varchar, timestamp, json, text } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  business: varchar("business").notNull(),
  credits: integer("credits").default(3).notNull()
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