"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Car } from "lucide-react";
import { CarForm } from "./forms/car-form";
import { currentUser } from "@clerk/nextjs/server";
import { getUserIdByClerkId } from "@/actions/queries";
import { getUserCars } from "@/actions/car-queries";

export type CarType = {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string;
  make: string;
  model: string;
  year: number;
  checks: string | null;
  photoUrl: string | null;
};

export default async function MyCarCard() {
  const user = await currentUser();
  if (!user) {
    return <div>Please log in to view your car.</div>;
  }

  const userId = await getUserIdByClerkId(user.id);
  const Cars: CarType[] = await getUserCars(userId);
  console.log(Cars);

  return (
    <Card className="w-full max-w-[526.2px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Car className="h-6 w-6" />
          My Car Details
        </CardTitle>
        <CardDescription>
          View and edit information about your car
        </CardDescription>
      </CardHeader>
      <CardContent>
        {Cars.map((carInfo, i) => (
          <div className="space-y-2" key={i}>
            <p>
              <strong>Make:</strong> {carInfo.make}
            </p>
            <p>
              <strong>Name:</strong> {carInfo.name}
            </p>
            <p>
              <strong>Model:</strong> {carInfo.model}
            </p>
            <p>
              <strong>Year:</strong> {carInfo.year}
            </p>
            <p>
              <strong>Description:</strong> {carInfo.checks}
            </p>
          </div>
        ))}

        {Cars.length <= 0 && <CarForm />}
      </CardContent>
    </Card>
  );
}
