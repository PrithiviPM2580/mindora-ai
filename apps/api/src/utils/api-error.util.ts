//! ============================================================
//! 🔨 Utility — Reusable utility functions for api error
//! ============================================================

import { status } from "http-status";
import { ERROR_CODE, type ErrorCode } from "./constants.util";

//@ -----------------------------------------------------------------
//@ Class:ApiError — Desc: Represents an API error with a status code, error code, and operational flag
//@ -----------------------------------------------------------------
export class ApiError extends Error {
  // Info: The HTTP status code associated with the error
  public readonly statusCode: number;
  public readonly errorCode: ErrorCode;
  public readonly isOperational: boolean;

  // Info: Constructor for creating an instance of ApiError
  constructor(
    message: string,
    statusCode: number = status.INTERNAL_SERVER_ERROR,
    errorCode: ErrorCode = ERROR_CODE.INTERNAL_SERVER_ERROR,
    isOperational = true,
  ) {
    // Info: Call the parent class constructor with the error message
    super(message);

    // Info: Set the name of the error to the constructor's name
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  // Error: Static method for creating a bad request error
  static badRequest(message = "Bad Request", errorCode: ErrorCode = ERROR_CODE.BAD_REQUEST) {
    return new ApiError(message, status.BAD_REQUEST, errorCode);
  }

  // Error: Static method for creating an unauthorized error
  static unauthorized(message = "Unauthorized", errorCode = ERROR_CODE.ACCESS_UNAUTHORIZED) {
    return new ApiError(message, status.UNAUTHORIZED, errorCode);
  }

  // Error: Static method for creating a forbidden error
  static notFound(message = "Resource not found", errorCode = ERROR_CODE.RESOURCE_NOT_FOUND) {
    return new ApiError(message, status.NOT_FOUND, errorCode);
  }

  // Error: Static method for creating a forbidden error
  static conflict(message = "Conflict", errorCode?: ErrorCode) {
    return new ApiError(message, status.CONFLICT, errorCode);
  }

  // Error: Static method for creating an internal server error
  static internalServer(
    message = "Internal server error",
    errorCode = ERROR_CODE.INTERNAL_SERVER_ERROR,
  ) {
    return new ApiError(message, status.INTERNAL_SERVER_ERROR, errorCode);
  }

  // Error: Static method for creating a too many requests error
  static tooManyRequests(message = "Too many requests", errorCode = ERROR_CODE.TOO_MANY_REQUESTS) {
    return new ApiError(message, status.TOO_MANY_REQUESTS, errorCode);
  }
}
