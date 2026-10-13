//! ============================================================
//! 📐 Auth Schema — Data validation schema for auth
//! ============================================================

import { z } from "zod";
import type { InferSchemas } from "zod-express-validator";

//@ -----------------------------------------------------------------
//@ Obj:registerSchema — Desc: Schema for validating user registration data
//@ ----------------------------------------------------------------------
export const registerSchema = {
  body: z.object({
    name: z.string().min(1, "Name is required").trim(),
    email: z.email("Invalid email address").trim(),
    password: z.string().min(6, "Password must be at least 6 characters long").trim(),
  }),
  res: z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
      name: z.string(),
      email: z.email(),
    }),
  }),
};

//@ -----------------------------------------------------------------
//@ Obj:loginSchema — Desc: Schema for validating user login data
//@ ----------------------------------------------------------------------
export const loginSchema = {
  body: z.object({
    email: z.email("Invalid email address").trim(),
    password: z.string().min(1, "Password is required").trim(),
  }),
};

//@ -----------------------------------------------------------------
//@ Type:Auth Schema — Desc: Type for the auth schema
//@ -----------------------------------------------------------------
export type RegisterInput = InferSchemas<typeof registerSchema>;
export type LoginInput = InferSchemas<typeof loginSchema>;
