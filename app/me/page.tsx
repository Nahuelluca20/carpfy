import Sarasa from "@/components/sarasa";
import MyCarCard from "./components/my-car-card";
import TeamMembersCard from "./components/team-members-card";

export default function Home() {
  return (
    <div>
      <MyCarCard />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TeamMembersCard />
      </div>
      <Sarasa />
    </div>
  );
}
