"use client";

import { UserForm } from "./user-form";
import { UserAnalytics as UserAnalyticsType, UserOutput } from "@/shared/types";
import { UserAnalytics } from "./user-analytics";
import { UserTable } from "./user-table";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// TODO: Move to shared client and server schema
export const formSchema = z.object({
  name: z.string().min(2).max(50),
  age: z.coerce.number().min(1).max(100),
  email: z.string().email("Invalid email address"),
});

export const UserMain = ({
  analytics,
  users,
}: {
  analytics: UserAnalyticsType;
  users: UserOutput[];
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 0,
      email: "",
    },
  });

  return (
    <>
      <div className="my-4 p-4 border rounded-md">
        <UserAnalytics analytics={analytics} />
      </div>
      <div className="my-4 p-4 border rounded-md">
        <UserForm form={form} />
      </div>
      <UserTable users={users} />
    </>
  );
};
