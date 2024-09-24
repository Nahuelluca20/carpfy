"use server";

import { getCarById } from "@/actions/car-queries";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getModifications } from "@/actions/modifications-queries";
import { getProducts } from "@/actions/products-links";
import { ProductsLinksTable } from "@/app/me/my-car/components/tables/products-links-table";
import { FutureModificationsTable } from "@/app/me/my-car/components/tables/future-modifications-table";

export default async function page({
  params,
}: {
  params: { owner: string; carId: string };
}) {
  const car = await getCarById(params.carId);
  const modifications = await getModifications(params.carId);
  const productsLinks = await getProducts(car.userId);

  return (
    <section className="flex flex-col lg:flex-row gap-8">
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
      <div>
        {productsLinks && modifications && (
          <Card className="w-full lg:max-w-[400px]">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Product Links</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductsLinksTable
                modifications={modifications}
                productLinks={productsLinks}
              />
            </CardContent>
          </Card>
        )}
        {modifications && (
          <Card className="w-full lg:max-w-[400px] mt-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Product Links</CardTitle>
            </CardHeader>
            <CardContent>
              <FutureModificationsTable modifications={modifications} />
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
