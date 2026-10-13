//! ============================================================
//! ♟️ Local Strategy — Strategy implementation for strategy
//! ============================================================

import { Strategy as LocalStrtegy } from "passport-local";
import * as authService from "@/modules/auth/auth.service";
import { logger } from "@/utils/logger.util";

//@ -----------------------------------------------------------------
//@ Obj:localStrategy — Desc: Local authentication strategy
//@ -----------------------------------------------------------------------
const localStrategy = new LocalStrtegy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
  },
  async (email, password, done) => {
    try {
      // Info: Validate user credentials using authService
      const user = await authService.validateUser(email, password);

      // Info: If user is not found or password is invalid, return an error
      if (!user) {
        // Error: Log the error for invalid credentials
        logger.error(`Invalid email or password for user with email ${email}`, {
          label: "Local_Strategy",
        });
        return done(null, false, { message: "Invalid email or password" });
      }

      // Info: If user is found and password is valid, return the user object
      return done(null, user);
    } catch (error) {
      // Error: Log the error for unexpected issues during validation
      logger.error(`Error in Local strategy: ${error}`, {
        label: "Local_Strategy",
      });
      return done(error, false, { message: "Error in Local strategy" });
    }
  },
);

export default localStrategy;
