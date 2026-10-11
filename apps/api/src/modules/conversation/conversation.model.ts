//! ============================================================
//! 🧱 Conversation Model — Data model definition for conversation
//! ============================================================

import mongoose, { Schema, type Types } from "mongoose";

//@ -----------------------------------------------------------------
//@ Interface:IConversation — Desc: Interface for the Conversation model
//@ -----------------------------------------------------------------
export interface IConversation {
  notebookId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  isArchived: boolean;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

//@ -----------------------------------------------------------------
//@ Obj:conversationSchema — Desc: Schema for the Conversation model
//@ -----------------------------------------------------------------
const conversationSchema = new Schema<IConversation>(
  {
    notebookId: {
      type: Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    lastMessageAt: {
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
//--  Indexes : Indexes for the conversation schema
//-- ------------------------------------------------------
conversationSchema.index({
  notebookId: 1,
  userId: 1,
  updatedAt: -1,
});

// Info: Create the Mongoose model for the conversation schema
const Conversation = mongoose.model<IConversation>("Conversation", conversationSchema);

export default Conversation;
