"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Plus, Trash } from "lucide-react";
import React, { useState } from "react";

interface Modification {
  id: number;
  name: string;
  status: string;
}
export default function FutureModificationsCard() {
  const [modifications, setModifications] = useState<Modification[]>([]);

  const [newModification, setNewModification] = useState({
    name: "",
    status: "",
  });

  const handleAddModification = () => {
    if (newModification.name && newModification.status) {
      setModifications([
        ...modifications,
        { id: Date.now(), ...newModification },
      ]);
      setNewModification({ name: "", status: "" });
    }
  };

  const handleDeleteModification = (id: number) => {
    setModifications(modifications.filter((mod) => mod.id !== id));
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Future Modifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Modification</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modifications.map((mod) => (
              <TableRow key={mod.id}>
                <TableCell>{mod.name}</TableCell>
                <TableCell>{mod.status}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteModification(mod.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="New modification"
            value={newModification.name}
            onChange={(e) =>
              setNewModification({ ...newModification, name: e.target.value })
            }
          />
          <Input
            placeholder="Status"
            value={newModification.status}
            onChange={(e) =>
              setNewModification({
                ...newModification,
                status: e.target.value,
              })
            }
          />
          <Button onClick={handleAddModification}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
