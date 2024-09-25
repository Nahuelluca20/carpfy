"use server";

import { db } from "@/lib/db/drizzle";
import { cars } from "@/lib/db/schema/cars";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

export async function getUserCars(userId: string): Promise<Car[]> {
  const userCar = await db
    .select()
    .from(cars)
    .where(eq(cars.userId, userId))
    .execute();

  return userCar;
}

export async function getUserFirstCar(userId: string): Promise<Car | null> {
  const userCar = await db
    .select()
    .from(cars)
    .where(eq(cars.userId, userId))
    .limit(1)
    .execute();

  return userCar.length > 0 ? userCar[0] : null;
}

export async function getCarById(carId: string) {
  const Car = await db
    .select()
    .from(cars)
    .where(eq(cars.id, carId))
    .limit(1)
    .execute();

  return Car[0] ?? [];
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
    revalidatePath("me/team");
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
