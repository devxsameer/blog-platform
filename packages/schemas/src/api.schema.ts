import { z } from 'zod';

export const ApiEnvelope = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.literal(true),
    message: z.string(),
    data,
    meta: z.any().optional(),
  });
