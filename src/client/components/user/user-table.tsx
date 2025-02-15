"use client";

import { Button } from "@/client/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table";
import { UserOutput } from "@/shared/types";
import { deleteUser } from "@/client/handlers/userapi";

export const UserTable = ({ users }: { users: UserOutput[] }) => {
  const handleDelete = async (id: number) => {
    const [, error] = await deleteUser(id.toString());
    if (error) {
      console.error(error);
    }
  };

  return (
    <Table>
      <TableCaption>A list of users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="flex gap-2 justify-end">
              <Button variant="outline">Edit</Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
