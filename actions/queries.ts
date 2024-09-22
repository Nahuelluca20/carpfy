import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";

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
