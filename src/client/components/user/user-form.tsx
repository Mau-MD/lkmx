"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/client/components/ui/form";
import { UseFormReturn } from "react-hook-form";

import { z } from "zod";
import { Input } from "@/client/components/ui/input";
import { Button } from "@/client/components/ui/button";
import { createUser } from "@/client/handlers/userapi";
import { useToast } from "@/client/hooks/use-toast";
import { formSchema } from "./user-main";

export const UserForm = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) => {
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const [, error] = await createUser({
      name: values.name,
      age: values.age,
      email: values.email,
    });
    if (error) {
      toast({
        title: "Error creating user",
        description: error,
        variant: "destructive",
      });
      console.error(error);
      return;
    }
    form.reset();
    toast({
      title: "User created",
      description:
        "User created successfully. Please refresh the page to see the new user.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your age"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
