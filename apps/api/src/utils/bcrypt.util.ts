//! ============================================================
//! 🔨 Bcrypt Utility — Reusable utility functions for hassing
//! ============================================================

import bcrypt from "bcryptjs";

//> -----------------------------------------------------------------
//> Fn:hashValue() — Desc: Hash a value with bcrypt
//> -----------------------------------------------------------------
export const hashValue = async (value: string, saltRound: number = 10): Promise<string> => {
  return bcrypt.hash(value, saltRound);
};

//> -----------------------------------------------------------------
//> Fn:compareValue() — Desc: Compare a value with a hashed value
//> -----------------------------------------------------------------
export const compareValue = async (value: string, hashedValue: string): Promise<boolean> => {
  return bcrypt.compare(value, hashedValue);
};
