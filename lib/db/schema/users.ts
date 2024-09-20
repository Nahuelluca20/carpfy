import { pgTable, varchar, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull().unique(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }).unique(),

  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  imageUrl: varchar("image_url", { length: 255 }),
  bio: text("bio"),
  website: varchar("website", { length: 255 }),
  xUrl: varchar("x_url", { length: 255 }),
  githubUrl: varchar("github_url", { length: 255 }),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
