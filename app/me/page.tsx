import MyCarCard from "./components/cards/my-car";
import TeamMembersCard from "./components/cards/team-members";
import TeamCars from "./components/cards/team-cars";
import { getUserIdByClerkId } from "@/actions/queries";
import { currentUser } from "@clerk/nextjs/server";
import { getTeamMembersByUserId } from "./queries";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <div>Please log in to view your car.</div>;
  }

  const userId = await getUserIdByClerkId(user.id);
  const teams = await getTeamMembersByUserId(userId);

  return (
    <div>
      <MyCarCard />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teams && <TeamMembersCard teams={teams} />}
        {teams && <TeamCars teamId={teams.teamId} />}
      </div>
    </div>
  );
}
