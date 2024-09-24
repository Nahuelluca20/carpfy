"use server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getModifications } from "@/actions/modifications-queries";
import { getUserCars } from "@/actions/car-queries";
import { getUserIdByClerkId } from "@/actions/queries";
import { currentUser } from "@clerk/nextjs/server";
import { CarType } from "./my-car-card";
import { ProductsLinksForm } from "./forms/products-links-form";
import { ProductsLinksTable } from "./tables/products-links-table";
import { getProducts } from "@/actions/products-links";

export default async function FutureModificationsPage() {
  const user = await currentUser();
  if (!user) {
    return <div>Please log in to view your car.</div>;
  }

  const userId = await getUserIdByClerkId(user.id);
  const Cars: CarType[] = await getUserCars(userId);
  const modifications = await getModifications(Cars[0].id);
  const productsLinks = await getProducts(userId);

  return (
    <Card className="w-full max-w-[528px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Product Links</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductsLinksTable
          modifications={modifications}
          productLinks={productsLinks}
        />
        <ProductsLinksForm modifications={modifications} userId={userId} />
      </CardContent>
    </Card>
  );
}
