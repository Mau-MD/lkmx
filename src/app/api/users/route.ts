import { UserService } from "@/server/service/user-service";
import { NextResponse } from "next/server";

export const GET = async () => {
    const users = await UserService.getAllUsers()
    return NextResponse.json(users)
}

export const POST = async (request: Request) => {
    const body = await request.json()

    if(!body.name || !body.age || !body.email) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await UserService.createUser({
        name: body.name,
        age: body.age,
        email: body.email
    })

    return NextResponse.json({ message: "User created" }, { status: 201 })
}
