//! ============================================================
//! 🔧 Auth Service — Business logic fro auth
//! ============================================================

import { ApiError } from "@/utils/api-error.util";
import { logger } from "@/utils/logger.util";
import * as authRepository from "./auth.repository";
import type { RegisterInput } from "./auth.schema";
import type { PublicUser } from "./auth.type";

//> -----------------------------------------------------------------
//> Fn:register() — Desc: Register a new user
//> -----------------------------------------------------------------
export const register = async (input: RegisterInput["body"]): Promise<PublicUser> => {
  // Info: Destructure input
  const { name, email, password } = input;

  // Info: Check if user with the given email already exists
  const userExists = await authRepository.existsByEmail(email);

  // Info: If user exists, log error and throw ApiError
  if (userExists) {
    // Error: Log the error for existing user
    logger.error(`User with email ${email} already exists`, {
      label: "Auth_Service",
    });
    throw ApiError.badRequest("User with this email already exists");
  }

  // Info: Create a new user
  const user = await authRepository.create({
    name,
    email,
    password,
  });

  // Info: Log the successful user creation
  return {
    name: user.name,
    email: user.email,
  };
};
