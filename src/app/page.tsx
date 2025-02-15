import { Toaster } from "@/client/components/ui/toaster";
import { UserAnalytics } from "@/client/components/user/user-analytics";
import { UserForm } from "@/client/components/user/user-form";
import { UserTable } from "@/client/components/user/user-table";
import { getUserAnalytics, getUsers } from "@/client/handlers/userapi";

export default async function Home() {
  const [users, usersError] = await getUsers();
  const [analytics, analyticsError] = await getUserAnalytics();

  if (users == null) {
    return <div>Error loading users: {usersError}</div>;
  }

  if (analytics == null) {
    return <div>Error loading analytics: {analyticsError}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">User Management System</h1>
      <div className="my-4 p-4 border rounded-md">
        <UserAnalytics analytics={analytics} />
      </div>
      <div className="my-4 p-4 border rounded-md">
        <UserForm />
      </div>
      <UserTable users={users} />
      <Toaster />
    </div>
  );
}
