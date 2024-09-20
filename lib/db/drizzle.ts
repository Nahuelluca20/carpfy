import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import { users } from "./schema/users";
import { teams, teamMembers, teamMembersRelations } from "./schema/teams";

dotenv.config();

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not set");
}

export const client = postgres(process.env.POSTGRES_URL);
export const db = drizzle(client, {
  schema: { users, teamMembers, teams, teamMembersRelations },
});
