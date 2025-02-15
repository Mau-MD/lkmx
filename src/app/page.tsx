import { Toaster } from "@/client/components/ui/toaster";
import { UserMain } from "@/client/components/user/user-main";
import { getUserAnalytics, getUsers } from "@/client/handlers/userapi";

export const dynamic = "force-dynamic";

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
      <UserMain analytics={analytics} users={users} />
      <Toaster />
    </div>
  );
}
