"use server";

import { db } from "@/lib/db/drizzle";
import { modifications } from "@/lib/db/schema/modifications";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export interface Modification {
  id: string;
  date: Date;
  description: string;
  name: string;
  carId: string;
}

export async function getModifications(carId: string) {
  const modificationList = db
    .select()
    .from(modifications)
    .where(eq(modifications.carId, carId));
  return modificationList;
}

export async function addModification(modification: Omit<Modification, "id">) {
  const newModification = await db.insert(modifications).values({
    date: modification.date,
    carId: modification.carId,
    description: modification.description,
    name: modification.name,
  });

  if (newModification) {
    revalidatePath("/me/my-car");
    revalidatePath("me/team/[owner]/car/[carId]", "page");
    return "success";
  }

  return [null];
}

export async function deleteModification(formData: FormData) {
  const schema = z.object({
    id: z.string().uuid(),
  });
  const data = schema.parse({
    id: formData.get("id"),
  });

  try {
    await db.delete(modifications).where(eq(modifications.id, data.id));

    revalidatePath("/me/my-car");
    revalidatePath("me/team/[owner]/car/[carId]", "page");
    return { message: `Deleted todo ${data.id}` };
  } catch (e) {
    return { message: `Failed to delete todo ${e}` };
  }
}
