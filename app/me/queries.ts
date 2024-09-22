"use server";

import { db } from "@/lib/db/drizzle";
import { cars } from "@/lib/db/schema/cars";
import { teamMembers, teams } from "@/lib/db/schema/teams";
import { users } from "@/lib/db/schema/users";
import { and, eq, ne } from "drizzle-orm";

export async function getTeamMembersByUserId(userId: string) {
  const teamMembership = await db
    .select({
      teamId: teamMembers.teamId,
    })
    .from(teamMembers)
    .where(eq(teamMembers.userId, userId));

  if (!teamMembership.length) {
    throw new Error("El usuario no pertenece a ningún equipo.");
  }

  const teamId = teamMembership[0].teamId;

  const teamMembersList = await db
    .select({
      userId: teamMembers.userId,
      teamName: teams.name,
      user: {
        firstName: users.firstName,
        lastName: users.lastName,
        imageUrl: users.imageUrl,
      },
    })
    .from(teamMembers)
    .innerJoin(users, eq(teamMembers.userId, users.id))
    .innerJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(and(eq(teamMembers.teamId, teamId), ne(teamMembers.userId, userId)));

  return {
    teamName: teamMembersList[0].teamName,
    members: teamMembersList,
    teamId: teamId,
  };
}

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
