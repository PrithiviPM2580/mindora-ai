//! ============================================================
//! 📋 Logger — Application logging
//! ============================================================

import "winston-daily-rotate-file";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import winston from "winston";
import { loadEnvironment } from "@/config/environment.config";

// Info: Load environment variables from .env file
loadEnvironment();

//@ -----------------------------------------------------------------
//@ Interface:LogInfo — Desc: Interface for log information
//@ -----------------------------------------------------------------
interface LogInfo extends winston.Logform.TransformableInfo {
  message: string;
  label?: string;
}
// Info: Define the structure for log information
const { combine, timestamp, printf } = winston.format;

// Info: Define an array to hold the log transports (console, file, etc.)
const transports: winston.transport[] = [];

// Info: Get the current environment and log level from environment variables, with defaults
const nodeEnv = process.env.NODE_ENV ?? "development";
const logLevel = process.env.LOG_LEVEL ?? "info";

// Info: Define the directory for log files
const logDir = path.join(process.cwd(), "logs");

// Info: Create the log directory if it doesn't exist and the environment is production
if (nodeEnv === "production" && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

//> -----------------------------------------------------------------
//> Fn:customFormat() — Desc: Custom format for log messages
//> -----------------------------------------------------------------------
const customFormat = combine(
  // Info: Add a timestamp to each log message
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),

  printf((info) => {
    // Info: Destructure the log information into its components
    const { timestamp, level, message, label, ...meta } = info as LogInfo;

    // Info: Create a string representation of the label if it exists
    const labelStr = label ? `${label}` : "";

    // Info: Clean the meta object to only include string keys
    const cleanMeta = Object.fromEntries(
      Object.entries(meta).filter(([key]) => typeof key === "string"),
    );

    // Info: Create a string representation of the meta information if it exists
    const metaStr = Object.keys(cleanMeta).length ? `\n${JSON.stringify(cleanMeta, null, 2)}` : "";

    // Info: Format the log message based on the log level (info, error, warn, etc.)
    switch (level) {
      case "info":
        return `🟢 ${chalk.gray(timestamp)} [${chalk.green(
          level.toUpperCase(),
        )}] [${chalk.cyanBright("APP")}: ${chalk.green(
          labelStr,
        )}]: ${chalk.greenBright(message)} ${chalk.greenBright(metaStr)}`;

      case "error":
        return `🔴 ${chalk.gray(timestamp)} [${chalk.red(
          level.toUpperCase(),
        )}] [${chalk.cyanBright("APP")}: ${chalk.red(
          labelStr,
        )}]: ${chalk.redBright(message)} ${chalk.redBright(metaStr)}`;

      case "warn":
        return `🟡 ${chalk.gray(timestamp)} [${chalk.yellow(
          level.toUpperCase(),
        )}] [${chalk.cyanBright("APP")}: ${chalk.yellow(
          labelStr,
        )}]: ${chalk.yellowBright(message)} ${chalk.yellowBright(metaStr)}`;

      default:
        return `${chalk.gray(timestamp)} [${chalk.green(
          level.toUpperCase(),
        )}] [${chalk.cyanBright("APP")}: ${chalk.green(
          labelStr,
        )}]: ${chalk.greenBright(message)} ${chalk.greenBright(metaStr)}`;
    }
  }),
);

// Info: Configure the transports for logging based on the environment (development or production)
if (nodeEnv === "development") {
  // Info: Add a console transport for development environment with custom formatting and log level
  transports.push(
    new winston.transports.Console({
      format: customFormat,
      level: logLevel,
    }),
  );
}

// Info: Add file transports for production environment to log info, error, and combined logs to separate files
if (nodeEnv === "production") {
  // Info: Add a daily rotate file transport for production environment to log info, error, and combined logs to separate files
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, "app.log"),
      level: "info",
    }),
  );

  // Info: Add a daily rotate file transport for production environment to log error logs to a separate file
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, "errors.log"),
      level: "error",
    }),
  );

  // Info: Add a daily rotate file transport for production environment to log combined logs to a separate file
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
    }),
  );
}

//@ -----------------------------------------------------------------
//@ Obj:logger — Desc: A logger instance for the application
//@ ------------------------------------------------------------------
export const logger = winston.createLogger({
  level: logLevel, // Info: Set the log level based on the environment variable or default to "info"
  format: customFormat, // Info: Use the custom format defined above for log messages
  transports, // Info: Use the transports defined above for logging (console, file, etc.)
  silent: nodeEnv === "test", // Info: Silence the logger in test environment to avoid cluttering test output
});
