//! ============================================================
//! 🛡️ CSRF Middleware — Request processing middleware for csrf
//! ============================================================

import { doubleCsrf } from "csrf-csrf";
import type { Request } from "express";
import { appConfig } from "@/config/app.config";

//> -----------------------------------------------------------------
//> Fn:csrf() — Desc: CSRF middleware for request processing
//> -----------------------------------------------------------------
const { doubleCsrfProtection, generateCsrfToken } = doubleCsrf({
  getSecret: () => appConfig.CSRF_SECRET, // Use the CSRF secret from the application configuration for generating and validating CSRF tokens.
  getSessionIdentifier: (req: Request) => req.ip ?? "", // Use the client's IP address as the session identifier for CSRF token validation. If the IP address is not available, use an empty string.
  cookieName: "csrf-token", // Name of the cookie to store the CSRF token. The token will be sent to the client in this cookie.
  cookieOptions: {
    httpOnly: false, // Allow client-side JavaScript to access the CSRF token cookie. This is necessary for sending the token in AJAX requests.
    sameSite: appConfig.NODE_ENV === "production" ? "strict" : "lax", // Set the SameSite attribute of the CSRF token cookie based on the environment. In production, use "strict" to prevent cross-site requests, and in development, use "lax" to allow some cross-site requests.
    secure: appConfig.NODE_ENV === "production", // Set the Secure attribute of the CSRF token cookie based on the environment. In production, use "true" to ensure the cookie is only sent over HTTPS, and in development, use "false" to allow HTTP.
  },
  getCsrfTokenFromRequest: (req: Request) => req.get("X-CSRF-Token") ?? "", // Get the CSRF token from the "X-CSRF-Token" header of the request. If the header is not present, use an empty string.
});

export { doubleCsrfProtection, generateCsrfToken };
