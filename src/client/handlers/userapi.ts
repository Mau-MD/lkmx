import { SERVER_URL } from "@/shared/config";
import { UserAnalytics, UserInput, UserOutput } from "@/shared/types";
import { Result, withErrorHandling } from "./api";

export async function getUsers(): Promise<Result<UserOutput[]>> {
  return await withErrorHandling(async () => {
    const res = await fetch(`${SERVER_URL}/api/users`);
    return (await res.json()) as UserOutput[];
  });
}

export async function getUserAnalytics(): Promise<Result<UserAnalytics>> {
  return await withErrorHandling(async () => {
    const res = await fetch(`${SERVER_URL}/api/users/analytics`);
    return (await res.json()) as UserAnalytics;
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

export async function updateUser(userId: number, user: UserInput): Promise<Result<void>> {
  return await withErrorHandling(async () => {
    await fetch(`${SERVER_URL}/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(user),
    });
  });
}
export async function deleteUser(id: string): Promise<Result<void>> {
  return await withErrorHandling(async () => {
    await fetch(`${SERVER_URL}/api/users/${id}`, {
      method: "DELETE",
    });
  });
}