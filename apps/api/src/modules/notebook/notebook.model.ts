//! ============================================================
//! 🧱 Notebook Model — Data model definition for notebook
//! ============================================================

import mongoose, { Schema, type Types } from "mongoose";

//@ -----------------------------------------------------------------
//@ Interface:Settings — Desc: Settings for the notebook
//@ ----------------------------------------------------------------------
interface Settings {
  responseStyle: "concise" | "balanced" | "detailed";
  language: "en" | "es";
}

//@ -----------------------------------------------------------------
//@ Interface:INotebook — Desc: The data model for a notebook
//@ ---------------------------------------------------------------------
export interface INotebook {
  title: string;
  description: string;
  owner: Types.ObjectId;
  sources: Types.ObjectId[];
  settings: Settings;
  summary: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

//@ -----------------------------------------------------------------
//@ Obj:notebookSchema — Desc: The Mongoose schema for the notebook model
//@ ----------------------------------------------------------------------
const notebookSchema = new Schema<INotebook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },
    description: {
      type: String,
      default: "",
      trim: true,
      maxLength: 2000,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sources: [
      {
        type: Schema.Types.ObjectId,
        ref: "Source",
      },
    ],
    settings: {
      responseStyle: {
        type: String,
        enum: ["concise", "balanced", "detailed"],
        default: "balanced",
      },
      language: {
        type: String,
        enum: ["en", "es"],
        default: "en",
      },
    },
    summary: {
      type: String,
      default: "",
      trim: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
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
//--   Indexes: Indexes for the notebook schema
//-- ------------------------------------------------------
notebookSchema.index({
  owner: 1,
  updatedAt: -1,
});

// Info: Create the Mongoose model for the notebook schema
const Notebook = mongoose.model<INotebook>("Notebook", notebookSchema);

export default Notebook;
