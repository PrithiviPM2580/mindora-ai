//! ============================================================
//! 🔨 Utility — Reusable utility functions
//! ============================================================

import type { Response } from "express";
import status from "http-status";
import type { z } from "zod";

//> -----------------------------------------------------------------
//> Fn:formatZodError() — Desc: Formats a Zod error into a JSON response
//> ---------------------------------------------------------------------
export const formatZodError = (error: z.ZodError, res: Response): Response => {
  // ERROR: Issues from Zod validation error
  const issues = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
    code: issue.code,
  }));

  // Info:Return a JSON response with the formatted Zod error
  return res.status(status.BAD_REQUEST).json({
    message: "Validation error",
    errors: issues,
  });
};

//> -----------------------------------------------------------------
//> Fn:formatError() — Desc: Format Zod validation errors into a more readable structure
//> -----------------------------------------------------------------
export const formatError = (issues: z.core.$ZodIssue[]) =>
  // Info: Return an array of formatted error objects containing the path, message, and code for each validation issue
  issues.map((issue) => ({
    path: issue.path.join("."),
    messsage: issue.message,
    code: issue.code,
  }));
