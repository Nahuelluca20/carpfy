// "use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import MyCarCard from "../app/me/components/my-car-card";

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
}

interface Car {
  id: number;
  name: string;
  image: string;
  owner: TeamMember;
}

interface Improvement {
  id: number;
  carId: number;
  description: string;
  proposedBy: TeamMember;
  date: Date | null;
}

export default function Sarasa() {
  // const [team, setTeam] = useState<TeamMember[]>([
  //   { id: 1, name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
  //   { id: 2, name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
  //   { id: 3, name: "Charlie", avatar: "/placeholder.svg?height=32&width=32" },
  // ]);
  // const [cars, setCars] = useState<Car[]>([
  //   {
  //     id: 1,
  //     name: "Red Speedster",
  //     image: "/placeholder.svg?height=32&width=32",
  //     owner: team[0],
  //   },
  //   {
  //     id: 2,
  //     name: "Blue Cruiser",
  //     image: "/placeholder.svg?height=32&width=32",
  //     owner: team[1],
  //   },
  //   {
  //     id: 3,
  //     name: "Green Machine",
  //     image: "/placeholder.svg?height=32&width=32",
  //     owner: team[2],
  //   },
  // ]);
  // const [improvements, setImprovements] = useState<Improvement[]>([
  //   {
  //     id: 1,
  //     carId: 1,
  //     description: "Upgrade suspension",
  //     proposedBy: team[0],
  //     date: new Date(),
  //   },
  //   {
  //     id: 2,
  //     carId: 2,
  //     description: "Install new exhaust",
  //     proposedBy: team[1],
  //     date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  //   },
  //   {
  //     id: 3,
  //     carId: 3,
  //     description: "Repaint exterior",
  //     proposedBy: team[2],
  //     date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  //   },
  // ]);
  // const [newMember, setNewMember] = useState("");
  // const [newCar, setNewCar] = useState({ name: "", image: "" });
  // const [newImprovement, setNewImprovement] = useState({
  //   carId: 0,
  //   description: "",
  //   date: null as Date | null,
  // });

  // const addTeamMember = () => {
  //   if (newMember) {
  //     setTeam([
  //       ...team,
  //       {
  //         id: team.length + 1,
  //         name: newMember,
  //         avatar: "/placeholder.svg?height=32&width=32",
  //       },
  //     ]);
  //     setNewMember("");
  //   }
  // };

  // const addCar = () => {
  //   if (newCar.name && newCar.image) {
  //     setCars([
  //       ...cars,
  //       {
  //         id: cars.length + 1,
  //         name: newCar.name,
  //         image: newCar.image,
  //         owner: team[0],
  //       },
  //     ]);
  //     setNewCar({ name: "", image: "" });
  //   }
  // };

  // const addImprovement = () => {
  //   if (newImprovement.carId && newImprovement.description) {
  //     setImprovements([
  //       ...improvements,
  //       {
  //         id: improvements.length + 1,
  //         carId: newImprovement.carId,
  //         description: newImprovement.description,
  //         proposedBy: team[0],
  //         date: newImprovement.date,
  //       },
  //     ]);
  //     setNewImprovement({ carId: 0, description: "", date: null });
  //   }
  // };

  // const removeImprovement = (id: number) => {
  //   setImprovements(improvements.filter((imp) => imp.id !== id));
  // };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* <h1 className="text-4xl font-bold mb-8">Car Improvement Dashboard</h1> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Cars</CardTitle>
            <CardDescription>Your {`team's `} vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cars.map((car) => (
                <div key={car.id} className="flex items-center space-x-4">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={car.image} alt={car.name} />
                    <AvatarFallback>{car.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{car.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Owner: {car.owner.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Add New Car
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Car</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new car.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newCar.name}
                      onChange={(e) =>
                        setNewCar({ ...newCar, name: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="image"
                      value={newCar.image}
                      onChange={(e) =>
                        setNewCar({ ...newCar, image: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addCar}>Add Car</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Improvements</CardTitle>
            <CardDescription>Scheduled car improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {improvements.map((improvement) => (
                <div
                  key={improvement.id}
                  className="flex justify-between items-start"
                >
                  <div>
                    <p className="font-medium">
                      {cars.find((car) => car.id === improvement.carId)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {improvement.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {improvement.date
                        ? format(improvement.date, "MMM d, yyyy")
                        : "Date not set"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeImprovement(improvement.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove improvement</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Add Improvement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Improvement</DialogTitle>
                  <DialogDescription>
                    Schedule a new car improvement.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="car" className="text-right">
                      Car
                    </Label>
                    <select
                      id="car"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newImprovement.carId}
                      onChange={(e) =>
                        setNewImprovement({
                          ...newImprovement,
                          carId: Number(e.target.value),
                        })
                      }
                    >
                      <option value={0}>Select a car</option>
                      {cars.map((car) => (
                        <option key={car.id} value={car.id}>
                          {car.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      value={newImprovement.description}
                      onChange={(e) =>
                        setNewImprovement({
                          ...newImprovement,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant="outline"
                          className={`col-span-3 justify-start text-left font-normal ${
                            !newImprovement.date && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newImprovement.date ? (
                            format(newImprovement.date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newImprovement.date || undefined}
                          onSelect={(date) =>
                            setNewImprovement({ ...newImprovement, date })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addImprovement}>Add Improvement</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card> */}
      </div>
    </div>
  );
}
