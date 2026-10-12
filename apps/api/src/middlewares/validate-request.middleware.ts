//! ============================================================
//! 🛡️ Validate Request Middleware — Request processing middleware for validation
//! ============================================================

import status from "http-status";
import { type Schemas, validate } from "zod-express-validator";
import { formatError, formatZodError } from "@/utils/index.util";
import { logger } from "@/utils/logger.util";

//> -----------------------------------------------------------------
//> Fn:validateRequest() — Desc: Validates the request against the provided schemas
//> -----------------------------------------------------------------
export const validateRequest = (schemas: Schemas) => {
  return validate(schemas, ({ bodyError, paramsError, queryError }, res) => {
    // Info: Determine the first error encountered in the request validation
    const error = bodyError ?? paramsError ?? queryError;

    // ERROR: If no error is found, return a generic internal server error response
    if (!error) {
      // Error: Log an error message indicating that a validation error occurred but no specific error details were found
      logger.error("Validation error occurred, but no specific error details were found.", {
        label: "Validate_Request_Middleware",
      });
      return res.status(status.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error ",
      });
    }

    // Error: Log the validation error details and return a formatted Zod error response
    logger.error("Validation error occurred.", {
      label: "Validate_Request_Middleware",
      error: formatError(error.issues),
    });
    return formatZodError(error, res);
  });
};
