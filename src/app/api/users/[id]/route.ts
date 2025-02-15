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

    await UserService.deleteUser(idNumber);
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
}