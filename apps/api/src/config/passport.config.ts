//! ============================================================
//! ⚙️ Passport Config — Application configuration for passport
//! ============================================================

import passport from "passport";
import jwtStrategy from "@/modules/auth/strategies/jwt.strategy";
import localStrategy from "@/modules/auth/strategies/local.strategy";

//-- ------------------------------------------------------
//--  Passport : Use strategies for authentication
//-- ------------------------------------------------------
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

export default passport;
