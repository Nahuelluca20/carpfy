"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Gauge, CarFront, ListChecks, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getUserFirstCar } from "@/actions/car-queries";

export default async function MyCar({
  userId,
  isMine = false,
  ownerName = "",
}: {
  userId: string;
  isMine?: boolean;
  teamId?: string;
  ownerName?: string;
}) {
  const MyCar = await getUserFirstCar(userId);

  return (
    <Card className="w-full mb-8 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5">
          <div className="h-full max-h-[300px] w-full overflow-hidden">
            <Image
              alt={`${MyCar?.model}` + ` ${MyCar?.name}`}
              className="object-cover w-full h-full"
              height="300"
              src={MyCar?.photoUrl ?? ""}
              width="400"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between md:w-3/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-6 w-6" />
              <span>{MyCar?.name}</span>
            </CardTitle>
            <CardDescription>
              {MyCar?.model} {MyCar?.year}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <CarFront className="h-4 w-4" />
                <span>{MyCar?.model}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                <span>{MyCar?.make}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{MyCar?.year}</span>
              </div>
              <div className="flex justify-start items-center gap-2 ">
                <div>
                  <ListChecks className="h-4 w-4" />
                </div>
                <span className="max-h-20 truncate">{MyCar?.checks}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button asChild>
              <Link
                href={
                  isMine
                    ? "me/my-car"
                    : `/me/team/${ownerName}/car/${MyCar?.id}`
                }
              >
                View Details
              </Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
