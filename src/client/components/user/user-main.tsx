"use client";

import { UserForm } from "./user-form";
import { UserAnalytics as UserAnalyticsType, UserOutput } from "@/shared/types";
import { UserAnalytics } from "./user-analytics";
import { UserTable } from "./user-table";

export const UserMain = ({
  analytics,
  users,
}: {
  analytics: UserAnalyticsType;
  users: UserOutput[];
}) => {
  return (
    <>
      <div className="my-4 p-4 border rounded-md">
        <UserAnalytics analytics={analytics} />
      </div>
      <div className="my-4 p-4 border rounded-md">
        <UserForm />
      </div>
      <UserTable users={users} />
    </>
  );
};
