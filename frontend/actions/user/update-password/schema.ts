import { z } from 'zod';

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(3, { message: 'Password must be at least 3 characters long' }),
    password: z.string().min(3, { message: 'Password must be at least 3 characters long' }),
    repeatedPassword: z.string().min(3, { message: 'Password must be at least 3 characters long' }),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: 'Passwords do not match',
    path: ['repeatedPassword'],
  })

export type UpdatePasswordInputType = z.infer<typeof updatePasswordSchema>;