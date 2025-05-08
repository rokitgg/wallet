"use client";

import { motion } from "motion/react";
import { LoaderCircle, Wallet } from "lucide-react";
import { Input } from "@acme/ui/input";
import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/form";
import { formSchema } from "@acme/validators/forms/email";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { sleep } from "~/lib/utils";
import { useRouter } from "next/navigation";
export function EmailSetup() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await sleep(200);
    return router.push(`/setup/otp?email=${values.email}`);
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.1 }}
      className="w-full max-w-md flex flex-col items-center"
    >
      {/* Logo */}
      <div className="mb-6">
        <Wallet className="w-14 h-14 text-foreground" />
      </div>

      {/* Welcome text */}
      <div className="text-center mb-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-1.5">
          Welcome to Wallet
        </h1>
        <p className="text-muted-foreground text-base">
          Log in or sign up to get started.
        </p>
      </div>

      {/* Input field */}
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Email or Phone Number"
                    className="w-full rounded-2xl placeholder:text-muted-foreground/50 placeholder:font-medium bg-muted/20 border-none px-4 py-6"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="xl"
            disabled={!form.formState.isValid || isSubmitting}
          >
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </Form>

      {/* Helper text */}
      <p className="text-sm text-muted-foreground mt-6 text-center">
        We'll create an account if you don't have one yet.
      </p>
    </motion.div>
  );
}
