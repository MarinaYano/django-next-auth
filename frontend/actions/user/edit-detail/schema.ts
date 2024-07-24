import { z } from 'zod';

export const editDetailSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
  introduction: z.string().optional(),
});

export type EditDetailType = z.infer<typeof editDetailSchema>;