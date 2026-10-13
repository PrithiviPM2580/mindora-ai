//! ============================================================
//! 🔧 Auth Service — Business logic fro auth
//! ============================================================

import { ApiError } from "@/utils/api-error.util";
import { logger } from "@/utils/logger.util";
import * as authRepository from "./auth.repository";
import type { RegisterInput } from "./auth.schema";
import type { AuthenticatedUser, PublicUser } from "./auth.type";

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

export const validateUser = async (
  email: string,
  password: string,
): Promise<AuthenticatedUser | null> => {
  const user = await authRepository.findByEmail(email);

  if (!user) {
    logger.error(`User with email ${email} not found`, {
      label: "Auth_Service",
    });
    return null;
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    logger.error(`Invalid password for user with email ${email}`, {
      label: "Auth_Service",
    });
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const getAuthentictedUser = async (userId: string): Promise<AuthenticatedUser | null> => {
  const user = await authRepository.findById(userId);

  if (!user) {
    logger.error(`User with ID ${userId} not found`, {
      label: "Auth_Service",
    });
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
