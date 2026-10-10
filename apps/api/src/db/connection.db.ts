//! ============================================================
//! 🗄️ Database — Database connection and configuration
//! ============================================================

import type { Server } from "node:http";
import mongoose from "mongoose";
import { appConfig } from "@/config/app.config";
import { dbConfig } from "@/config/db.config";
import { ApiError } from "@/utils/api-error.util";
import { ERROR_CODE } from "@/utils/constants.util";
import { logger } from "@/utils/logger.util";

// Info: Flag to track the database connection status
let isConnected = false;

//> -----------------------------------------------------------------
//> Fn:connectToDatabase() — Desc: Connects to the database
//> -----------------------------------------------------------------
export const connectToDatabase = async () => {
  // Info: If already connected, return the existing connection
  if (isConnected) return mongoose.connection;

  try {
    // Info: Connect to the MongoDB database using Mongoose with the provided URI and configuration
    await mongoose.connect(appConfig?.MONGO_URI, dbConfig);

    // Info: Set the connection flag to true and log a success message
    isConnected = true;

    // Info: Log a message indicating successful database connection
    logger.info("Database connection established successfully", {
      label: "Database",
    });
  } catch (error) {
    // Error: Log the error message and throw an ApiError for database connection failure
    logger.error("Database connection failed", {
      label: "Database",
      error,
    });

    // Error: Throw an ApiError with a message, status code, and error code for database connection failure
    throw ApiError.internalServer("Database connection failed", ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
};

//> -----------------------------------------------------------------
//> Fn:disconnectFromDatabase() — Desc: Disconnects from the database
//> -----------------------------------------------------------------
export const disconnectFromDatabase = async () => {
  // Info: If not connected, return early
  if (!isConnected) return;

  try {
    // Info: Disconnect from the MongoDB database using Mongoose
    await mongoose.disconnect();

    // Info: Set the connection flag to false and log a success message
    isConnected = false;

    // Info: Log a message indicating successful database disconnection
    logger.info("Database connection closed successfully", {
      label: "Database",
    });
  } catch (error) {
    // Error: Log the error message and throw an ApiError for database disconnection failure
    logger.error("Database connection close failed", {
      label: "Database",
      error,
    });

    // Error: Throw an ApiError with a message, status code, and error code for database disconnection failure
    throw ApiError.internalServer(
      "Database connection close failed",
      ERROR_CODE.INTERNAL_SERVER_ERROR,
    );
  }
};

//> -----------------------------------------------------------------
//> Fn:gracefulShutdown() — Desc: Gracefully shuts down the server and disconnects from the database
//> --------------------------------------------------------------------
export const gracefulShutdown = async (server: Server) => {
  try {
    // Info: Disconnect from the database before shutting down the server
    await disconnectFromDatabase();

    // Info: Log a message indicating successful database disconnection
    logger.info("Database connection closed successfully", {
      label: "Database",
    });
  } catch (error) {
    // Error: Log the error message and throw an ApiError for database disconnection failure
    logger.error("Database connection close failed", {
      label: "Database",
      error,
    });

    // Error: Throw an ApiError with a message, status code, and error code for database disconnection failure
    throw ApiError.internalServer(
      "Database connection close failed",
      ERROR_CODE.INTERNAL_SERVER_ERROR,
    );
  } finally {
    // Info: Close the server and log a message indicating successful server closure
    server.close(() => {
      // Info: Log a message indicating successful server closure
      logger.info("Server closed successfully", {
        label: "Server",
      });

      // Info: Exit the process with a success code (0) after server closure
      process.exit(0);
    });
  }
};
