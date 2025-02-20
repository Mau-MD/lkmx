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
import { useToast } from "@/client/hooks/use-toast";

export const UserTable = ({
  users,
  handleEdit,
}: {
  users: UserOutput[];
  handleEdit: (user: UserOutput) => void;
}) => {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    const [, error] = await deleteUser(id.toString());
    if (error) {
      toast({
        title: "Error deleting user",
        description: error,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "User deleted",
      description:
        "User deleted successfully. Please refresh the page to see the changes.",
    });
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
              <Button variant="outline" onClick={() => handleEdit(user)}>
                Edit
              </Button>
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
