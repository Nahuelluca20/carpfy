import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { format } from "date-fns";
import { deleteModification } from "@/actions/modifications-queries";

interface FutureModificationsTableProps {
  modifications: {
    id: string | null;
    date: Date | null;
    description: string | null;
    name: string | null;
    carId: string | null;
  }[];
}

export function FutureModificationsTable({
  modifications,
}: FutureModificationsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Modification</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modifications.map((mod) => (
          <TableRow key={mod.id}>
            <TableCell>
              {format(new Date(mod.date ?? new Date()), "PP")}
            </TableCell>
            <TableCell>{mod.name}</TableCell>
            <TableCell>{mod.description}</TableCell>
            <TableCell>
              <form action={deleteModification}>
                <input name="id" type="hidden" value={String(mod.id)} />
                <Button variant="destructive" size="sm" type="submit">
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete modification</span>
                </Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
