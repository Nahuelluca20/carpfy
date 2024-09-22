"use server";

import { db } from "@/lib/db/drizzle";
import { teamMembers } from "@/lib/db/schema/teams";
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
      user: {
        firstName: users.firstName,
        lastName: users.lastName,
        imageUrl: users.imageUrl,
      },
    })
    .from(teamMembers)
    .innerJoin(users, eq(teamMembers.userId, users.id))
    .where(and(eq(teamMembers.teamId, teamId), ne(teamMembers.userId, userId)));

  return teamMembersList;
}
