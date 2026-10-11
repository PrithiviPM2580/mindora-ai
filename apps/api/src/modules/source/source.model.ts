//! ============================================================
//! 🧱 Source Model — Data model definition for source
//! ============================================================

import mongoose, { Schema, type Types } from "mongoose";

//@ -----------------------------------------------------------------
//@ Type:SiurceType — Desc: The type of the source
//@ -----------------------------------------------------------------
export type SourceType =
  | "text"
  | "pdf"
  | "image"
  | "video"
  | "audio"
  | "url"
  | "markdown"
  | "youtube";

//@ -----------------------------------------------------------------
//@ Type:ProcessingStatus — Desc: The status of the source's processing
//@ -----------------------------------------------------------------
export type ProcessingStatus =
  | "pending"
  | "extracting"
  | "chunking"
  | "embedding"
  | "ready"
  | "failed";

//@ -----------------------------------------------------------------
//@ Interface:SourceMetaadata — Desc: Metadata for the source
//@ -----------------------------------------------------------------
interface SourceMetadata {
  pageCount: number | null;
  wordCount: number | null;
  fileSize: number | null;
  author: string | null;
}

//@ -----------------------------------------------------------------
//@ Interface:ISource — Desc: The interface for the Source model
//@ -----------------------------------------------------------------------
export interface ISource {
  notebookId: Types.ObjectId;
  uploadedBy: Types.ObjectId;
  title: string;
  type: SourceType;
  originalFileName: string | null;
  mimeType: string | null;
  fileUrl: string | null;
  externalUrl: string | null;
  extractedText: string | null;
  contentHash: string | null;
  metadata: SourceMetadata;
  processingStatus: ProcessingStatus;
  processingError: string | null;
  processedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

//@ -----------------------------------------------------------------
//@ Obj:sourceSchema — Desc: The schema for the Source model
//@ ------------------------------------------------------------------------
const sourceSchema = new Schema<ISource>(
  {
    notebookId: {
      type: Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
      index: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },
    type: {
      type: String,
      enum: ["text", "pdf", "image", "video", "audio", "url", "markdown", "youtube"],
      required: true,
    },
    originalFileName: {
      type: String,
      default: null,
      trim: true,
    },
    mimeType: {
      type: String,
      default: null,
      trim: true,
    },
    fileUrl: {
      type: String,
      default: null,
      trim: true,
    },
    externalUrl: {
      type: String,
      default: null,
      trim: true,
    },
    extractedText: {
      type: String,
      default: null,
    },
    contentHash: {
      type: String,
      default: null,
      trim: true,
    },
    metadata: {
      pageCount: {
        type: Number,
        default: null,
      },
      wordCount: {
        type: Number,
        default: null,
      },
      fileSize: {
        type: Number,
        default: null,
      },

      author: {
        type: String,
        default: null,
        trim: true,
      },
    },
    processingStatus: {
      type: String,
      enum: ["pending", "extracting", "chunking", "embedding", "ready", "failed"],
      default: "pending",
      required: true,
    },
    processingError: {
      type: String,
      default: null,
      trim: true,
    },
    processedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        const obj = ret as Record<string, unknown>;
        delete obj.__v;
        return obj;
      },
    },
  },
);

//-- ------------------------------------------------------
//--  Indexes : Indexes for the source schema
//-- ------------------------------------------------------
sourceSchema.index({ notebookId: 1, createdAt: -1 });

// Info: Create the Mongoose model for the source schema
const Source = mongoose.model<ISource>("Source", sourceSchema);

export default Source;
