"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash, Plus, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Modification {
  id: string;
  date: Date;
  name: string;
  description: string;
}

export default function FutureModificationsCard() {
  const [modifications, setModifications] = useState<Modification[]>([]);
  const [newModification, setNewModification] = useState<
    Omit<Modification, "id">
  >({
    date: new Date(),
    name: "",
    description: "",
  });

  const handleAddModification = () => {
    if (newModification.name && newModification.date) {
      setModifications([
        ...modifications,
        { ...newModification, id: Date.now().toString() },
      ]);
      setNewModification({ date: new Date(), name: "", description: "" });
    }
  };

  const handleDeleteModification = (id: string) => {
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
              <TableHead>Date</TableHead>
              <TableHead>Modification</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modifications.map((mod) => (
              <TableRow key={mod.id}>
                <TableCell>{format(mod.date, "PP")}</TableCell>
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
        <div className="mt-4 space-y-2">
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-[280px] justify-start text-left font-normal ${
                    !newModification.date && "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newModification.date ? (
                    format(newModification.date, "PP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={newModification.date}
                  onSelect={(date) =>
                    setNewModification({
                      ...newModification,
                      date: date || new Date(),
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Input
              placeholder="New modification"
              value={newModification.name}
              onChange={(e) =>
                setNewModification({ ...newModification, name: e.target.value })
              }
              className="flex-1"
            />
          </div>
          <Textarea
            placeholder="Description"
            value={newModification.description}
            onChange={(e) =>
              setNewModification({
                ...newModification,
                description: e.target.value,
              })
            }
          />
          <Button onClick={handleAddModification} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add Modification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
