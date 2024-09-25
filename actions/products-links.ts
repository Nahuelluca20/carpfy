"use server";

import { db } from "@/lib/db/drizzle";
import { productLinks } from "@/lib/db/schema/product-links";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export interface Product {
  id: string;
  modificationId: string;
  url: string;
  product_name: string;
  userId: string;
}

export async function getProducts(userId: string) {
  const productsList = await db
    .select()
    .from(productLinks)
    .where(eq(productLinks.userId, userId));
  return productsList;
}

export async function addProductLink(product: Omit<Product, "id">) {
  const newModification = await db.insert(productLinks).values({
    modificationId: product.modificationId,
    url: product.url,
    product_name: product.product_name,
    userId: product.userId,
  });

  if (newModification) {
    revalidatePath("/me/my-car", "page");
    revalidatePath("me/team/[owner]/car/[carId]", "page");
    return "success";
  }

  return [null];
}

export async function deleteProduct(formData: FormData) {
  const schema = z.object({
    id: z.string().uuid(),
  });
  const data = schema.parse({
    id: formData.get("id"),
  });

  try {
    await db.delete(productLinks).where(eq(productLinks.id, data.id));

    revalidatePath("/me/my-car");
    revalidatePath("me/team/[owner]/car/[carId]", "page");
    return { message: `Deleted todo ${data.id}` };
  } catch (e) {
    return { message: `Failed to delete todo ${e}` };
  }
}
