import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { modifications } from "./modifications";
import { users } from "./users";

export const productLinks = pgTable("product_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  modificationId: uuid("modification_id")
    .notNull()
    .references(() => modifications.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  url: text("url").notNull(),
  product_name: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const productLinksRelations = relations(productLinks, ({ one }) => ({
  modification: one(modifications, {
    fields: [productLinks.modificationId],
    references: [modifications.id],
  }),
  user: one(users, {
    fields: [productLinks.userId],
    references: [users.id],
  }),
}));
