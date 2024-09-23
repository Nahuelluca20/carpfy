"use server";

import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema/users";
import { teamMembers, teams } from "@/lib/db/schema/teams";
import { eq } from "drizzle-orm";

export async function getUserIdByClerkId(clerkUserId: string) {
  const user = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .execute();

  return user[0].id;
}

export async function getTeamMembersByUserId(userId: string) {
  const teamMembership = await db
    .select({
      teamId: teamMembers.teamId,
    })
    .from(teamMembers)
    .where(eq(teamMembers.userId, userId));

  if (!teamMembership.length) {
    return null;
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
    .where(eq(teamMembers.teamId, teamId));

  return {
    teamName: teamMembersList[0].teamName,
    members: teamMembersList,
    teamId: teamId,
  };
}
