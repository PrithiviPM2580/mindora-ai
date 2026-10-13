//! ============================================================
//! 🛣️ Auth Routes — API route definitions for auth
//! ============================================================

import { Router } from "express";
import passport from "@/config/passport.config";
import * as authController from "./auth.controller";
import { loginValidator, registerValidator } from "./auth.validator";

//-- ------------------------------------------------------
//--  Auth Router instance
//-- ------------------------------------------------------
const authRouter = Router();

//-- ------------------------------------------------------
//--  Register Route
//-- ------------------------------------------------------
// @desc Register a new user
// @route POST /api/v1/auth/register
// @access Public
authRouter.post("/register", registerValidator, authController.register);

// @desc Login with email and password
// @route POST /api/v1/auth/login
// @access Public
authRouter.post(
  "/login",
  loginValidator,
  passport.authenticate("local", { session: false }),
  authController.login,
);

export default authRouter;
