//! ============================================================
//! ⚙️ Config — Application configuration for environment variable
//! ============================================================

import { envSchema } from "@/schema/env.schema";
import { formatError } from "@/utils/index.util";
import { logger } from "@/utils/logger.util";
import { loadEnvironment } from "./environment.config";

// Info: Load environment variables from .env file
loadEnvironment();

// Info: Parse and validate environment variables using Zod schema
const parsedEnv = envSchema.safeParse(process.env);

// Info: If the environment variables are invalid, log an error message with the formatted validation issues
if (!parsedEnv.success) {
  // Error: Log the validation issues for environment variables using the logger utility
  logger.error("Invalid environment variables:", {
    label: "App_Config",
    error: formatError(parsedEnv.error.issues),
  });
  process.exit(1); // Exit the application if environment variables are invalid
}

export const appConfig = parsedEnv.data;
