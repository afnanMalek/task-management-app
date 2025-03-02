import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["pending", "in-progress", "completed"]).optional(), // Making status optional
  statusId: z.number().int().min(1).max(3, "Invalid status ID"), 
});
