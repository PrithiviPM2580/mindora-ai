//! ============================================================
//! 🎮 Auth Controller — HTTP request handlers for auth
//! ============================================================

import type { Controller } from "@/types/index.type";
import { sendResponse } from "@/utils/send-response.util";
import * as authService from "./auth.service";
import type { RegisterValidator } from "./auth.validator";

//> -----------------------------------------------------------------
//> Fn:register() — Desc: Register a new user
//> -----------------------------------------------------------------
export const register: Controller<RegisterValidator> = async (req, res) => {
  // Info: Call the auth service to register a new user
  const user = await authService.register(req.body);

  // Info: Send a successful response with the registered user data
  sendResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: user,
  });
};
