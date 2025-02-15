import { UserAnalytics, UserInput, UserOutput } from "@/shared/types";
import { UserModel } from "../model/user-model";

export class UserService {
    static async createUser(user: UserInput): Promise<void> {
        await UserModel.createUser({
            name: user.name,
            age: user.age,
            email: user.email
        })
    }

    static async getAllUsers(): Promise<UserOutput[]> {
        const users = await UserModel.getAllUsers()
        return users.map((user) => ({
            id: user.id,
            name: user.name,
            age: user.age,
            email: user.email
        }))
    }

    static async updateUser(id: number, user: UserInput): Promise<void> {
        await UserModel.updateUser(id, {
            name: user.name,
            age: user.age,
            email: user.email
        })
    }

    static async deleteUser(id: number): Promise<void> {
        await UserModel.deleteUser(id)
    }

    static async getUserAnalytics(): Promise<UserAnalytics> {
        return await UserModel.getUserAnalytics()
    }

}