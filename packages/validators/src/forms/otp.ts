import { z } from "zod";

export const formSchema = z.object({
  otp: z.string().min(6).max(6),
});
