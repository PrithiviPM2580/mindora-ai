//! ============================================================
//! 🎮 Auth Controller — HTTP request handlers for auth
//! ============================================================

import { appConfig } from "@/config/app.config";
import type { Controller } from "@/types/index.type";
import { ApiError } from "@/utils/api-error.util";
import { generateToken } from "@/utils/jwt.util";
import { sendResponse } from "@/utils/send-response.util";
import * as authService from "./auth.service";
import type { LoginValidator, RegisterValidator } from "./auth.validator";

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

export const login: Controller<LoginValidator> = async (req, res) => {
  if (!req.user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const token = generateToken({ sub: req.user.id });

  res.cookie("token", token, {
    httpOnly: true,
    secure: appConfig.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: 200,
    message: "Login successful",
    data: {
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      },
    },
  });
};
