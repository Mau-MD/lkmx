import { UserAnalytics } from "@/shared/types";
import db from "../db";
import { usersTable } from "../db/schema";
import { eq, sql } from "drizzle-orm";

export class UserModel {

    static async createUser(user: typeof usersTable.$inferInsert): Promise<void> {
        await db.insert(usersTable).values(user)
    }

    static async getAllUsers(): Promise<typeof usersTable.$inferSelect[]> {
        return await db.select().from(usersTable)
    }

    static async deleteUser(id: number): Promise<void> {
        await db.delete(usersTable).where(eq(usersTable.id, id))
    }

    static async getUserAnalytics(): Promise<UserAnalytics> {
        const result = await db.select({
            averageAge: sql<number>`AVG(${usersTable.age})`,
            totalUsers: sql<number>`COUNT(*)`
        }).from(usersTable)

        return {
            averageAge: result[0].averageAge,
            totalUsers: result[0].totalUsers
        }
    }
}