import { z } from "zod";

export const transactionBodySchema = z.object({
  value: z.number().positive(),
  type: z.enum(['c', 'd']),
  description: z.string().min(1).max(10),
});