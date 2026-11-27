import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email().max(254),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .max(128)
    // Basic composition guidance, not strict — length is the primary factor
    .regex(/[a-zA-Z]/, 'Password must contain a letter')
    .regex(/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Password must contain a number or symbol'),
  displayName: z.string().min(1).max(120),
});

export const loginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(128),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;