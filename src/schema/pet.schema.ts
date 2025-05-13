import { z } from "zod";

export const petSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  age: z
    .string()
    .refine((val) => /^\d+$/.test(val), { message: "Age must be a number" }),
  description: z.string().min(1, "Description is required"),
});
