import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { cars } from "./cars";
import { teamMembers } from "./teams";

export const modifications = pgTable("modifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  carId: uuid("car_id")
    .notNull()
    .references(() => cars.id),
  date: timestamp("date", { withTimezone: true }).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const modificationsRelations = relations(modifications, ({ one }) => ({
  car: one(cars, {
    fields: [modifications.carId],
    references: [cars.id],
  }),
}));

export const modificationVotes = pgTable("modification_votes", {
  id: uuid("id").defaultRandom().primaryKey(),
  modificationId: uuid("modification_id")
    .notNull()
    .references(() => modifications.id),
  teamMemberId: uuid("team_member_id")
    .notNull()
    .references(() => teamMembers.id),
  canAttend: boolean("can_attend").notNull(),
  votedAt: timestamp("voted_at", { withTimezone: true }).defaultNow(),
});

export const modificationVotesRelations = relations(
  modificationVotes,
  ({ one }) => ({
    modification: one(modifications, {
      fields: [modificationVotes.modificationId],
      references: [modifications.id],
    }),
    teamMember: one(teamMembers, {
      fields: [modificationVotes.teamMemberId],
      references: [teamMembers.id],
    }),
  })
);
