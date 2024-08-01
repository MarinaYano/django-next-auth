import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  content: z.string().min(3, { message: 'Content must be at least 3 characters long' }),
})

export type postSchemaType = z.infer<typeof postSchema>;