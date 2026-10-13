//! ============================================================
//! 📐 Schema — Data validation schema for environment
//! ============================================================

import { z } from "zod";

//@ -----------------------------------------------------------------
//@ Obj:envSchema — Desc: Data validation schema for environment variables
//@ -------------------------------------------------------------------
export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DB_NAME: z.string().min(1, "Database name is required"),
  APP_NAME: z.string().min(1, "Application name is required"),
  MONGO_URI: z.string("Invalid MongoDB URI").min(1, "MongoDB URI is required"),
  CSRF_SECRET: z.string().min(1, "CSRF secret is required"),
  APP_VERSION: z.string().min(1, "Application version is required"),
  JWT_SECRET: z.string().min(1, "JWT secret is required"),
});
