import { UserService } from "@/server/service/user-service";
import { NextResponse } from "next/server";

export const GET = async () => {
    const analytics = await UserService.getUserAnalytics()
    return NextResponse.json(analytics)
}