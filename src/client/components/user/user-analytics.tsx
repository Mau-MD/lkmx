"use client";

import { UserAnalytics as UserAnalyticsType } from "@/shared/types";

export const UserAnalytics = ({
  analytics,
}: {
  analytics: UserAnalyticsType;
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold">User Analytics</h2>
      <p className="text-sm text-gray-500">
        Total Users: {analytics.totalUsers}
      </p>
      <p className="text-sm text-gray-500">
        {/* Even if the type is number everywhere in the database and API,
        the result is a string. We need to convert it to a number again.. */}
        Average Age: {Number(analytics.averageAge).toFixed(2)}
      </p>
    </div>
  );
};
