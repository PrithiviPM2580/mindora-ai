//! ============================================================
//! 💾 Auth Repository — Data access layer for auth
//! ============================================================

import User, { type IUser, type UserDocument } from "./auth.model";
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

//> -----------------------------------------------------------------
//> Fn:findByEmail() — Desc: Find a user by email
//> -----------------------------------------------------------------
export const findByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

//> -----------------------------------------------------------------
//> Fn:findById() — Desc: Find a user by ID
//> -----------------------------------------------------------------
export const findById = async (id: string): Promise<UserDocument | null> => {
  return User.findById(id);
};
