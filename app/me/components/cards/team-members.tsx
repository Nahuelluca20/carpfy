"use server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import { getInitials } from "@/utils/strings";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ITeam {
  teamName: string;
  members: {
    userId: string;
    teamName: string;
    user: {
      firstName: string | null;
      lastName: string | null;
      imageUrl: string | null;
    };
  }[];
}

export default async function TeamMembers({ teams }: { teams: ITeam }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{teams.teamName}</CardTitle>
        <CardDescription>This is your team</CardDescription>
      </CardHeader>
      <ScrollArea type="always" className="max-h-[200px] h-full">
        <CardContent>
          <div>
            {teams.members.map((member) => (
              <div
                key={member.userId}
                className="flex items-center flex-wrap gap-2 mb-4"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={member.user.imageUrl ?? ""}
                    alt={
                      `${member.user.firstName}` + ` ${member.user.lastName}`
                    }
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
              </div>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
