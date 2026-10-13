//! ============================================================
//! ♟️ JWT Strategy — Strategy implementation for JWT
//! ============================================================

import type { Request } from "express";
import { Strategy as JwtStrategy } from "passport-jwt";
import { appConfig } from "@/config/app.config";
import * as authService from "@/modules/auth/auth.service";
import { logger } from "@/utils/logger.util";

//> -----------------------------------------------------------------
//> Fn:cookieExtractor() — Desc: Extract the JWT token from the request cookies
//> -----------------------------------------------------------------
const cookieExtractor = (req: Request): string | null => {
  // Info: Check if the request has cookies and extract the token
  if (req?.cookies) {
    // Info: Return the token from cookies or null if not present
    return req.cookies.token ?? null;
  }

  // Info: If no cookies are present, return null
  return null;
};

//@ -----------------------------------------------------------------
//@ Obj:jwtStrategy — Desc: JWT Strategy for authentication
//@ -----------------------------------------------------------------
const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: cookieExtractor,
    secretOrKey: appConfig.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      // Info: Get the authenticated user using the payload's subject (user ID)
      const user = await authService.getAuthentictedUser(payload.sub);

      // Info: If user is not found, return an error
      if (!user) {
        // Error: Log the error for user not found
        logger.error(`User with ID ${payload.sub} not found`, {
          label: "JWT_Strategy",
        });
        return done(null, false, { message: "User not found" });
      }

      // Info: If user is found, return the user object
      return done(null, user);
    } catch (error) {
      // Error: Log the error for unexpected issues during user retrieval
      logger.error(`Error in JWT strategy: ${error}`, {
        label: "JWT_Strategy",
      });
      return done(error, false, { message: "Error in JWT strategy" });
    }
  },
);

export default jwtStrategy;
