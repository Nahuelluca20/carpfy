"use server";

import { db } from "@/lib/db/drizzle";
import { cars } from "@/lib/db/schema/cars";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface Modification {
  id: string;
  date: Date;
  name: string;
  description: string;
}

// This is a mock database. Replace with your actual database logic.
let modifications: Modification[] = [];

export async function getModifications() {
  // In a real app, fetch this from your database
  return modifications;
}

export async function addModification(modification: Omit<Modification, "id">) {
  const newModification = {
    ...modification,
    id: Date.now().toString(),
    date: new Date(modification.date),
  };
  modifications.push(newModification);
  revalidatePath("/your-page-path");
  return newModification;
}

export async function deleteModification(id: string) {
  modifications = modifications.filter((mod) => mod.id !== id);
  revalidatePath("/your-page-path");
}
