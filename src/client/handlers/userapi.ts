import { SERVER_URL } from "@/shared/config";
import { UserAnalytics, UserInput, UserOutput } from "@/shared/types";
import { DELETE, GET, POST, PUT, Result } from "./api";

export async function getUsers(): Promise<Result<UserOutput[]>> {
  return await GET<UserOutput[]>(`${SERVER_URL}/api/users`);
}

export async function getUserAnalytics(): Promise<Result<UserAnalytics>> {
  return await GET<UserAnalytics>(`${SERVER_URL}/api/users/analytics`);
}

export async function createUser(user: UserInput): Promise<Result<void>> {
  return await POST<void>(`${SERVER_URL}/api/users`, user);
}

export async function updateUser(
  userId: number,
  user: UserInput
): Promise<Result<void>> {
  return await PUT<void>(`${SERVER_URL}/api/users/${userId}`, user);
}
export async function deleteUser(id: string): Promise<Result<void>> {
  return await DELETE<void>(`${SERVER_URL}/api/users/${id}`);
}
