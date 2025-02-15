"use client";

import { UserForm } from "./user-form";
import { UserAnalytics as UserAnalyticsType, UserOutput } from "@/shared/types";
import { UserAnalytics } from "./user-analytics";
import { UserTable } from "./user-table";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
  // If we are editing a user, we need to store the user id
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 0,
      email: "",
    },
  });

  const handleEdit = (user: UserOutput) => {
    setIsEditing(user.id);
    form.setValue("name", user.name);
    form.setValue("age", user.age);
    form.setValue("email", user.email);
  };

  return (
    <>
      <div className="my-4 p-4 border rounded-md">
        <UserAnalytics analytics={analytics} />
      </div>
      <div className="my-4 p-4 border rounded-md">
        <UserForm
          form={form}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>
      <UserTable users={users} handleEdit={handleEdit} />
    </>
  );
};
