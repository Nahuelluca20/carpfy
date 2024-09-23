import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { getTeamMemberCars } from "../../queries";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function TeamCars({ teamId }: { teamId: string }) {
  const carsOfTeam = await getTeamMemberCars(String(teamId));
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Cars</CardTitle>
        <CardDescription>Your {`team's `} vehicles</CardDescription>
      </CardHeader>
      <ScrollArea type="always" className="max-h-[200px] h-full">
        <CardContent>
          <div className="space-y-4">
            {carsOfTeam.map((car, i) => (
              <div
                key={`${car.name} - ${i}`}
                className="flex items-center space-x-4"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={car.photoUrl ?? ""} alt={car.name} />
                  <AvatarFallback>{car.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{car.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Owner: {car.userName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
