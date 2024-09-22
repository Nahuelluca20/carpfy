import { getUserIdByClerkId } from "@/actions/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { getTeamMembersByUserId } from "../queries";
import { getInitials } from "@/utils/strings";

export default async function TeamMembersCard() {
  const user = await currentUser();
  if (!user) {
    return <div>Please log in to view your car.</div>;
  }

  const userId = await getUserIdByClerkId(user.id);
  const teams = await getTeamMembersByUserId(userId);

  console.log(teams);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Team Members</CardTitle>
        <CardDescription>Manage your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {teams.map((member) => (
            <>
              <Avatar key={member.userId} className="w-8 h-8">
                <AvatarImage
                  src={member.user.imageUrl ?? ""}
                  alt={`${member.user.firstName}` + ` ${member.user.lastName}`}
                />
                <AvatarFallback>
                  {getInitials(
                    String(member.user.firstName),
                    String(member.user.lastName)
                  )}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold">
                {member.user.firstName} {member.user.lastName}
              </span>
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
