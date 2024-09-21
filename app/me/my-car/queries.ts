"use server";

import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema/users"; // Import the users schema
import { cars } from "@/lib/db/schema/cars";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getUserIdByClerkId(clerkUserId: string) {
  const user = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .execute();

  return user[0].id;
}
export type Car = {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string;
  make: string;
  model: string;
  year: number;
  checks: string | null;
  photoUrl: string | null;
};

export async function getUserCar(userId: string): Promise<Car[]> {
  const userCar = await db
    .select()
    .from(cars)
    .where(eq(cars.userId, userId))
    .execute();

  return userCar;
}

export interface CarDetails {
  name: string;
  make: string;
  model: string;
  year: number;
  checks?: string;
  photoUrl?: string;
}
export async function createCar(userId: string, carDetails: CarDetails) {
  const newCar = await db
    .insert(cars)
    .values({
      userId: userId,
      name: carDetails.name,
      make: carDetails.make,
      model: carDetails.model,
      year: carDetails.year,
      checks: carDetails.checks,
      photoUrl: carDetails.photoUrl,
    })
    .execute();

  if (newCar) {
    revalidatePath("me/my-car", "page");
  }

  return "created";
}

export async function editCar(carId: string, carDetails: CarDetails) {
  const updatedCar = await db
    .update(cars)
    .set({
      make: carDetails.make,
      name: carDetails.name,
      model: carDetails.model,
      year: carDetails.year,
      checks: carDetails.checks,
      photoUrl: carDetails.photoUrl,
    })
    .where(eq(cars.id, carId))
    .execute();

  return updatedCar;
}
