import { UserService } from "@/server/service/user-service";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{id: string}> }) => {
    const id  = (await params).id;
    if (!id) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const idNumber = parseInt(id);
    if (isNaN(idNumber)) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    try {
        await UserService.deleteUser(idNumber);
        return NextResponse.json({ message: "User deleted" }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
    }
}

export const PUT = async (request: NextRequest, { params }: { params: Promise<{id: string}> }) => {
    const id  = (await params).id;
    if (!id) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const body = await request.json();
    if (!body.name || !body.age || !body.email) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const idNumber = parseInt(id);
    if (isNaN(idNumber)) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    try {
        await UserService.updateUser(idNumber, body);
        return NextResponse.json({ message: "User updated" }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }
}
