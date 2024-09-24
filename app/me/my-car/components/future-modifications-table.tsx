"use client";

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
import {
  deleteModification,
  Modification,
} from "@/actions/modifications-queries";

interface FutureModificationsTableProps {
  modifications: Modification[];
}

export function FutureModificationsTable({
  modifications,
}: FutureModificationsTableProps) {
  const handleDeleteModification = async (id: string) => {
    await deleteModification(id);
  };

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
            <TableCell>{format(new Date(mod.date), "PP")}</TableCell>
            <TableCell>{mod.name}</TableCell>
            <TableCell>{mod.description}</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteModification(mod.id)}
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete modification</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
