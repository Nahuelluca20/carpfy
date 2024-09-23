import { getTeamMembersByUserId, getUserIdByClerkId } from "@/actions/queries";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import MyCar from "@/components/my-car";

export default async function page() {
  const user = await currentUser();
  if (!user) {
    return <div>Please log in to view your car.</div>;
  }

  const userId = await getUserIdByClerkId(user.id);
  const teams = await getTeamMembersByUserId(userId);

  return teams?.members.length === 0 ? (
    <section className="flex justify-center mt-10 mx-auto font-semibold text-3xl">
      No team members
    </section>
  ) : (
    teams?.members.map((user, i) => (
      <MyCar key={i + user.userId} userId={user.userId} />
    ))
  );
}
