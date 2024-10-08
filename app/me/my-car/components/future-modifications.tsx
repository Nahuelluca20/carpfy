"use server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FutureModificationsTable } from "./tables/future-modifications-table";
import { FutureModificationsForm } from "./forms/future-modifications-form";
import { getModifications } from "@/actions/modifications-queries";
import { getUserCars } from "@/actions/car-queries";
import { getUserIdByClerkId } from "@/actions/queries";
import { currentUser } from "@clerk/nextjs/server";
import { CarType } from "./my-car-card";

export default async function FutureModificationsPage() {
  const user = await currentUser();
  if (!user) {
    return <div>Please log in to view your car.</div>;
  }

  const userId = await getUserIdByClerkId(user.id);
  const Cars: CarType[] = await getUserCars(userId);
  const modifications = await getModifications(Cars[0].id);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Future Modifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FutureModificationsTable modifications={modifications} />
        <FutureModificationsForm carId={Cars[0].id} />
      </CardContent>
    </Card>
  );
}
