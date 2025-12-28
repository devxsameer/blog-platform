import { z } from 'zod';

export const UserSchema = z.object({
  id: z.uuid(),
  username: z.string(),
  email: z.email(),
  role: z.enum(['admin', 'author', 'user']),
  createdAt: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
