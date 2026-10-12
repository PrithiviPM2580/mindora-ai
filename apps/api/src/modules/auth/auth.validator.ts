//! ============================================================
//! ✅ Auth Validator — Input validation logic fro auth
//! ============================================================

import { validateRequest } from "@/middlewares/validate-request.middleware";
import { registerSchema } from "./auth.schema";

//> -----------------------------------------------------------------
//> Fn:Auth Validator — Desc: Validates the request body for user registration
//> ------------------------------------------------------------------
export const registerValidator = validateRequest(registerSchema);

//@ -----------------------------------------------------------------
//@ Type:Auth Validator — Desc: Type for the auth validator
//@ ------------------------------------------------------------------
export type RegisterValidator = typeof registerSchema;
