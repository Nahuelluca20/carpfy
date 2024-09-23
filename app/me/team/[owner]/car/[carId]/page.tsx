"use server";

import { getCarById } from "@/actions/car-queries";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function page({
  params,
}: {
  params: { owner: string; carId: string };
}) {
  const car = await getCarById(params.carId);
  console.log(car);
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{car.name}</CardTitle>
        <p className="text-muted-foreground">
          {car.make} {car.model} ({car.year})
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <Image
            src={car.photoUrl ?? ""}
            alt={`${car.make} ${car.model}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform hover:scale-105"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Make:</h3>
            <p>{car.make}</p>
          </div>
          <div>
            <h3 className="font-semibold">Model:</h3>
            <p>{car.model}</p>
          </div>
          <div>
            <h3 className="font-semibold">Year:</h3>
            <p>{car.year}</p>
          </div>
          <div>
            <h3 className="font-semibold">Checks:</h3>
            <p>{car.checks}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Owner:</h3>
          <p className="text-sm text-muted-foreground break-all">
            {params.owner}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
