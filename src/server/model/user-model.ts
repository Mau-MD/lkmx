import db from "../db";
import { usersTable } from "../db/schema";

export class UserModel {

    static async createUser(user: typeof usersTable.$inferInsert): Promise<void> {
        await db.insert(usersTable).values(user)
    }

    static async getAllUsers(): Promise<typeof usersTable.$inferSelect[]> {
        return await db.select().from(usersTable)
    }
    
}