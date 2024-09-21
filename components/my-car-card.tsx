import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Car, Fuel, Zap, Gauge } from "lucide-react";
import Link from "next/link";

export default function MyCarCard() {
  return (
    <Card className="w-full mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5">
          <div className="h-full w-full overflow-hidden">
            <img
              alt="Tesla Model 3"
              className="object-cover w-full h-full"
              height="300"
              src="/placeholder.svg?height=300&width=400"
              width="400"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between md:w-3/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-6 w-6" />
              <span>My Car</span>
            </CardTitle>
            <CardDescription>2023 Tesla Model 3</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Electric</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                <span>Autopilot</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4" />
                <span>Long Range</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                <span>Dual Motor</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button asChild>
              <Link href={"me/my-car"}>View Details</Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
