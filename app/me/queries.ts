"use server";

import { db } from "@/lib/db/drizzle";
import { cars } from "@/lib/db/schema/cars";
import { teamMembers } from "@/lib/db/schema/teams";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";

export async function getTeamMemberCars(teamId: string) {
  const teamMemberCars = await db
    .select({
      // id: cars.id,
      name: cars.name,
      make: cars.make,
      // model: cars.model,
      // year: cars.year,
      // checks: cars.checks,
      userName: users.firstName,
      photoUrl: cars.photoUrl,
    })
    .from(teamMembers)
    .innerJoin(cars, eq(cars.userId, teamMembers.userId))
    .innerJoin(users, eq(cars.userId, users.id))
    .where(eq(teamMembers.teamId, teamId));

  return teamMemberCars;
}
