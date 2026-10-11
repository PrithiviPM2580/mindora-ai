//! ============================================================
//! 🧱 Note Model — Data model definition fro note
//! ============================================================

import mongoose, { Schema, type Types } from "mongoose";

//@ -----------------------------------------------------------------
//@ Type:NoteType — Desc: The type of the note
//@ -----------------------------------------------------------------
export type NoteType = "manual" | "saved_answer" | "summary" | "study_guide" | "outline";

//@ -----------------------------------------------------------------
//@ Interface:INote — Desc: Interface for the Note model
//@ -----------------------------------------------------------------
export interface INote {
  notebookId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  content: string;
  type: NoteType;
  sourceMessageId: Types.ObjectId | null;
  sourceIds: Types.ObjectId[];
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

//@ -----------------------------------------------------------------
//@ Obj:noteSchema — Desc: Schema for the Note model
//@ -----------------------------------------------------------------
const noteSchema = new Schema<INote>(
  {
    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["manual", "saved_answer", "summary", "study_guide", "outline"],
      default: "manual",
    },

    sourceMessageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    sourceIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Source",
      },
    ],

    isPinned: {
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
//--  Indexes : Indexes for the Note model
//-- ------------------------------------------------------
noteSchema.index({
  notebookId: 1,
  userId: 1,
  updatedAt: -1,
});

// Info: Create the Mongoose model for the Note schema
const Note = mongoose.model<INote>("Note", noteSchema);

export default Note;
