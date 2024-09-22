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

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "sarasa");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/ddonepbyh/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Error al subir la imagen a Cloudinary");
  }

  const data = await response.json();
  return data.secure_url;
}
