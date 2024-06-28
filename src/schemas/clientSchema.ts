import { z } from "zod";

export const clientBodySchema = z.object({
  id: z.number(),
  limit: z.number().optional(),
  balance: z.number().optional(),
});