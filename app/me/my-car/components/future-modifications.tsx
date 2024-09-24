import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FutureModificationsTable } from "./future-modifications-table";
import { FutureModificationsForm } from "./forms/future-modifications-form";
import { getModifications } from "@/actions/modifications-queries";

export default async function FutureModificationsPage() {
  const modifications = await getModifications();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Future Modifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FutureModificationsTable modifications={modifications} />
        <FutureModificationsForm />
      </CardContent>
    </Card>
  );
}
