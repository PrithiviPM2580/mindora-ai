//! ============================================================
//! 🔨 JWT Utility — Reusable utility functions for jwt
//! ============================================================

import jwt from "jsonwebtoken";
import { appConfig } from "@/config/app.config";

export const generateToken = (payload: jwt.JwtPayload): string => {
  return jwt.sign({ sub: payload.sub }, appConfig.JWT_SECRET, { expiresIn: "1h" });
};
