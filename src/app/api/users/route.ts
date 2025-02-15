import { UserService } from "@/server/service/user-service";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const users = await UserService.getAllUsers()
        return NextResponse.json(users)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to get users" }, { status: 500 })
    }
}

export const POST = async (request: Request) => {
    const body = await request.json()

    if(!body.name || !body.age || !body.email) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    try {
        await UserService.createUser({
            name: body.name,
            age: body.age,
            email: body.email
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    return NextResponse.json({ message: "User created" }, { status: 201 })
}
