"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

    function handleCreateAccount(event:  MouseEventHandler<HTMLButtonElement>) {
        event.preventDefault();
        console.log("you clicked me!");
    }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-12 border border-emerald-900 rounded min-w-xs max-w-xs text-emerald-900"
      >
          <div className="flex justify-center text-2xl">
            <h1>Login</h1>
          </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <div className="horizontal-center">
          <Button type="submit" className="btn">
            Submit
          </Button>
        </div>
        <Separator className="bg-teal-600" />
        <div className="horizontal-center">
          <Button className="btn" onClick={handleCreateAccount}>Create Account</Button>
        </div>
      </form>
    </Form>
  );
}
