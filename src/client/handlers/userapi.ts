import { SERVER_URL } from "@/shared/config";
import { UserInput, UserOutput } from "@/shared/types";
import { Result, withErrorHandling } from "./api";

export async function getUsers(): Promise<Result<UserOutput[]>> {
  return await withErrorHandling(async () => {
    const res = await fetch(`${SERVER_URL}/api/users`);
    return (await res.json()) as UserOutput[];
  });
}

export async function createUser(user: UserInput): Promise<Result<void>> {
  return await withErrorHandling(async () => {
    await fetch(`${SERVER_URL}/api/users`, {
      method: "POST",
      body: JSON.stringify(user),
    });
  });
}
