//! ============================================================
//! 🧱 Generated Artifact Model — Data model definition for generated artifact
//! ============================================================

import mongoose, { Schema, type Types } from "mongoose";

//@ -----------------------------------------------------------------
//@ Type:GeneratedArtifactType — Desc: The type of the generated artifact
//@ -----------------------------------------------------------------
export type GeneratedArtifactType =
  | "summary"
  | "study-guide"
  | "faq"
  | "flashcards"
  | "quiz"
  | "mind-map"
  | "report"
  | "audio-overview";

//@ -----------------------------------------------------------------
//@ Type:ArtifactStatus — Desc: The status of the generated artifact
//@ -----------------------------------------------------------------
export type ArtifactStatus = "pending" | "processing" | "completed" | "failed";

//@ -----------------------------------------------------------------
//@ Interface:IGeneratedArtifact — Desc: Interface for the Generated Artifact model
//@ -----------------------------------------------------------------
export interface IGeneratedArtifact {
  notebook: Types.ObjectId;
  user: Types.ObjectId;
  type: GeneratedArtifactType;
  title: string;
  content: unknown;
  sourceIds: Types.ObjectId[];
  status: ArtifactStatus;
  createdAt: Date;
  updatedAt: Date;
}

//@ -----------------------------------------------------------------
//@ Obj:generatedArtifactSchema — Desc: Schema for the Generated Artifact model
//@ -----------------------------------------------------------------
const generatedArtifactSchema = new Schema<IGeneratedArtifact>(
  {
    notebook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "summary",
        "study-guide",
        "faq",
        "flashcards",
        "quiz",
        "mind-map",
        "report",
        "audio-overview",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    sourceIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Source",
      },
    ],

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
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
//--  Indexes : Indexes for generated artifact
//-- ------------------------------------------------------
generatedArtifactSchema.index({
  notebook: 1,
  createdAt: -1,
});

// Info: Create the Mongoose model for the generated artifact schema
const GeneratedArtifact = mongoose.model<IGeneratedArtifact>(
  "GeneratedArtifact",
  generatedArtifactSchema,
);

export default GeneratedArtifact;
