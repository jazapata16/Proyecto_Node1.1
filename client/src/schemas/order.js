import { z } from "zod";

export const orderSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  
});
