import ResetPassword from '@/components/auth/reset-password';
import { z } from 'zod';

export const schema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    repeatedPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: 'Passwords do not match',
    path: ['repeatedPassword'],
  })

export type InputType = z.infer<typeof schema>