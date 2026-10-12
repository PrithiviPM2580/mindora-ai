//! ============================================================
//! 🛣️ Auth Routes — API route definitions for auth
//! ============================================================

import { Router } from "express";
import * as authController from "./auth.controller";
import { registerValidator } from "./auth.validator";

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

export default authRouter;
