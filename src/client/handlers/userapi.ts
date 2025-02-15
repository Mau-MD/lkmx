import { SERVER_URL } from "@/shared/config";
import { UserInput, UserOutput } from "@/shared/types";

export async function getUsers(): Promise<UserOutput[]> {
  const res = await fetch(`${SERVER_URL}/api/users`);
  const data = (await res.json()) as UserOutput[];
  return data;
}

export async function createUser(user: UserInput) {
  await fetch(`${SERVER_URL}/api/users`, {
    method: "POST",
    body: JSON.stringify(user),
  });
}
