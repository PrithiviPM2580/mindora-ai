//! ============================================================
//! 🛡️ Multer Middleware — Request processing middleware for multer
//! ============================================================

import type { RequestHandler } from "express";
import multer from "multer";
import { ApiError } from "@/utils/api-error.util";
import { logger } from "@/utils/logger.util";

// Info: Storage configuration for multer. Using memory storage to store files in memory as Buffer objects.
const storage = multer.memoryStorage();

//> -----------------------------------------------------------------
//> Fn:fileFilter() — Desc: Filter files based on their MIME type
//> -----------------------------------------------------------------
const fileFilter: multer.Options["fileFilter"] = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  // Info: Allowed MIME types for file uploads. Only image, video, audio, and application types are allowed.
  const allowedMimeTypes = ["image/", "video/", "audio/", "application/"];

  // Info: Check if the uploaded file's MIME type starts with any of the allowed MIME types.
  if (!allowedMimeTypes.includes(file.mimetype)) {
    // Error: Log an error message indicating that the file type is not allowed, and return an ApiError with a 400 status code.
    logger.error(`File type not allowed: ${file.mimetype}`, {
      label: "Multer_Middleware",
    });

    return cb(new ApiError("File type not allowed", 400));
  }

  // Info: If the file type is allowed, call the callback function with null error and true to accept the file.
  return cb(null, true);
};

//> -----------------------------------------------------------------
//> Fn:upload() — Desc: Initialize the multer instance with the configured storage and file filter.
//> -----------------------------------------------------------------
const upload = multer({
  storage, // Use memory storage to store files in memory as Buffer objects.
  fileFilter, // Use the custom file filter to validate uploaded files based on their MIME type.
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB,
    files: 10, // 10 files
  },
});

//> -----------------------------------------------------------------
//> Fn:uploadSingleFile() — Desc: Upload a single file
//> -----------------------------------------------------------------
export const uploadSingleFile = (fieldName: string): RequestHandler => upload.single(fieldName);

//> -----------------------------------------------------------------
//> Fn:uploadMultipleFiles() — Desc: Upload multiple files
//> -----------------------------------------------------------------
export const uploadMultipleFiles = (fieldName: string, maxCount: number = 10): RequestHandler =>
  upload.array(fieldName, maxCount);

//> -----------------------------------------------------------------
//> Fn:uploadFields() — Desc: Upload multiple files with different field names
//> -----------------------------------------------------------------
export const uploadFields = (fields: { name: string; maxCount?: number }[]): RequestHandler =>
  upload.fields(fields);
