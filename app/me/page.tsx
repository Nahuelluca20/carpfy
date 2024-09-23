import MyCarCard from "../../components/my-car";
import TeamMembersCard from "./components/cards/team-members";
import TeamCars from "./components/cards/team-cars";
import { getUserIdByClerkId } from "@/actions/queries";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { getTeamMembersByUserId } from "@/actions/team-queries";

export const metadata: Metadata = {
  title: "Carpfy | Dashboard",
  description: "See your data here",
};

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <div>Please log in to view your car.</div>;
  }

  const userId = await getUserIdByClerkId(user.id);
  const teams = await getTeamMembersByUserId(userId);
  console.log(teams);

  return (
    <div>
      <MyCarCard userId={userId} isMine />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teams && <TeamMembersCard teams={teams} />}
        {teams && <TeamCars teamId={teams.teamId} />}
      </div>
    </div>
  );
}
