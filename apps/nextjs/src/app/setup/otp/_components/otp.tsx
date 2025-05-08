"use client";

import type { z } from "zod";
import { motion } from "motion/react";
import { LoaderCircle, Mail, MinusIcon } from "lucide-react";
import { Input } from "@acme/ui/input";
import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@acme/ui/form";
import { formSchema } from "@acme/validators/forms/otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OTPInput, type SlotProps } from "input-otp";
import { cn } from "@acme/ui";
import { auth } from "@acme/auth/client";
import { sleep } from "~/lib/utils";

export function OTP({ email }: { email: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await sleep(2000);
    console.log(email, values.otp);
    return;
    // const { data, error } = await auth.signIn.emailOtp({
    //   email: email,
    //   otp: values.otp,
    // });
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.1 }}
      className="w-full max-w-md flex flex-col items-center pb-12"
    >
      {/* Logo */}
      <div className="bg-muted/20 rounded-full p-4 mb-6">
        <Mail className="w-12 h-12 text-foreground" />
      </div>

      {/* Welcome text */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-semibold text-gray-900 mb-1.5">
          Verify your email
        </h1>
        <p className="text-muted-foreground/80 text-base">
          Please enter the code we sent you below.
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
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <OTPInput
                    containerClassName={cn(
                      "flex justify-center items-center gap-3 has-disabled:opacity-50 w-full",
                      { "animate-pulse": isSubmitting },
                    )}
                    maxLength={6}
                    {...field}
                    onComplete={(value) => {
                      if (value.length === 6) {
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    render={({ slots }) => (
                      <>
                        <div className="flex gap-2">
                          {slots.slice(0, 3).map((slot, idx) => (
                            <Slot
                              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                              key={idx}
                              {...slot}
                              isSubmitting={isSubmitting}
                            />
                          ))}
                        </div>

                        <div className="text-muted-foreground/80">
                          <MinusIcon size={16} aria-hidden="true" />
                        </div>

                        <div className="flex gap-2">
                          {slots.slice(3).map((slot, idx) => (
                            <Slot
                              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                              key={idx}
                              {...slot}
                              placeholderChar="0"
                              isSubmitting={isSubmitting}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* Helper text */}
      <p className="inline-flex items-center text-sm text-muted-foreground mt-6 text-center">
        Didn't receive the code?{" "}
        <Button
          type="button"
          variant="link"
          size="sm"
          className="font-semibold -ml-2"
          onClick={() => {
            console.log("resend");
          }}
        >
          Resend
        </Button>
      </p>
    </motion.div>
  );
}

function Slot(props: SlotProps & { isSubmitting: boolean }) {
  return (
    <div
      className={cn(
        "bg-[#F6F7F9] text-foreground relative -ms-px flex size-12 items-center justify-center font-medium shadow-xs transition-[color,box-shadow] rounded-2xl ",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive },
        { "animate-pulse delay-100": props.isSubmitting },
      )}
    >
      {props.char !== null ? (
        <div>{props.char}</div>
      ) : (
        <div className="text-muted-foreground/50 leading-loose text-lg">0</div>
      )}
    </div>
  );
}
