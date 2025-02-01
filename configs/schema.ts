import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const USER_TABLE=pgTable("users", {
  id:serial().primaryKey(),
  name:varchar().notNull(),
  email:varchar().notNull(),
  business:varchar().notNull(),
  credits:integer("Credits").default(3).notNull()
})