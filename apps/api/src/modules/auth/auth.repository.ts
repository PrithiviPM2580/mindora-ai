//! ============================================================
//! 💾 Auth Repository — Data access layer for auth
//! ============================================================

import User, { type IUser } from "./auth.model";
import type { CreateUserInput } from "./auth.type";

//> -----------------------------------------------------------------------
//> Fn:existsByEmail() — Desc: Check if a user with the given email exists
//> -----------------------------------------------------------------------
export const existsByEmail = async (email: string): Promise<boolean> => {
  return Boolean(await User.exists({ email }));
};

//> -----------------------------------------------------------------
//> Fn:create() — Desc: Create a new user
//> -----------------------------------------------------------------
export const create = async (userData: CreateUserInput): Promise<IUser> => {
  return User.create({
    ...userData,
    passwordHash: userData.password,
  });
};
