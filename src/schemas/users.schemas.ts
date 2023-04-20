import { z } from "zod";

const userSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  admin: z.boolean().default(false),
  active: z.boolean().default(true),
});

const createUserSchema = userSchema.omit({ id: true });

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const userLoginInfo = z.object({
  email: z.string().email(),
  password: z.string(),
  id: z.number(),
});

const passwordSchema = loginSchema.omit({ email: true });

export {
  userSchema,
  createUserSchema,
  loginSchema,
  passwordSchema,
  userLoginInfo,
};
