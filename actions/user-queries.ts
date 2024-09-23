// "use server"

// import { db } from "@/lib/db/drizzle";
// import { users } from "@/lib/db/schema/users";
// import { eq } from "drizzle-orm";

// export async function getUserIdByClerkId(useId: string) {
//   const user = await db
//     .select({
//       name: users.id,
//     })
//     .from(users)
//     .where(eq(users.clerkUserId, useId))
//     .execute();

//   return user[0].id;
// }
