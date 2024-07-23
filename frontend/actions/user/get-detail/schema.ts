import { z } from 'zod';

export const schema = z.object({
  password: z.string().min(8),
  repeatedPassword: z.string().min(8),
});

export type InputType = z.infer<typeof schema>;