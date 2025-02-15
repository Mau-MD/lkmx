import { UserForm } from "@/client/components/user/user-form";
import { UserTable } from "@/client/components/user/user-table";
import { getUsers } from "@/client/handlers/userapi";

export default async function Home() {
  const users = await getUsers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">User Management System</h1>
      <div className="my-4 p-4 border rounded-md">
        <UserForm />
      </div>
      <UserTable users={users} />
    </div>
  );
}
