import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { modifications } from "./modifications";

export const productLinks = pgTable("product_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  modificationId: uuid("modification_id")
    .notNull()
    .references(() => modifications.id),
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
}));
