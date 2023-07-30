import { string, z } from "zod";

export const createOrderSchema = z.object({
  title: z.string(
    {required_error: "Title is required",
  }),
});

export const updateOrderSchema = z.object({
  title: z.string(
    {required_error: "Title is required",
  }),
})
