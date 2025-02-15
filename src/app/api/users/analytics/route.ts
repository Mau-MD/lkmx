import { UserService } from "@/server/service/user-service";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const analytics = await UserService.getUserAnalytics();
    return NextResponse.json(analytics);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get user analytics" },
      { status: 500 },
    );
  }
};
