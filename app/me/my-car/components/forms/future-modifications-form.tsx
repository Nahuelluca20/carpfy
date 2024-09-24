"use client";
import { addModification } from "@/actions/modifications-queries";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
export function FutureModificationsForm() {
  const [newModification, setNewModification] = useState({
    date: new Date(),
    name: "",
    description: "",
  });

  const handleAddModification = async () => {
    if (newModification.name && newModification.date) {
      await addModification(newModification);
      setNewModification({ date: new Date(), name: "", description: "" });
    }
  };

  return (
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
  );
}
