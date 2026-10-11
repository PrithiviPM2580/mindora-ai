//! ============================================================
//! 🧱 Message Model — Data model definition fro message
//! ============================================================

import mongoose, { Schema, type Types } from "mongoose";

//@ -----------------------------------------------------------------
//@ Type:MessageRole — Desc: The role of the message
//@ ------------------------------------------------------------------------
export type MessageRole = "user" | "assistant" | "system";

//@ -----------------------------------------------------------------
//@ Type:MessageStatus — Desc: The status of the message
//@ ------------------------------------------------------------------------
export type MessageStatus = "pending" | "completed" | "failed";

//@ -----------------------------------------------------------------
//@ Interface:Citation — Desc: Interface for the Citation model
//@ -----------------------------------------------------------------
export interface Citation {
  sourceId: Types.ObjectId;
  chunkId: Types.ObjectId | null;
  pageNumber: number | null;
  quote: string | null;
  startOffset: number | null;
  endOffset: number | null;
}

//@ -----------------------------------------------------------------
//@ Interface:IMessage — Desc: Interface for the Message model
//@ -----------------------------------------------------------------
export interface MessageUsage {
  promptTokens: number | null;
  completionTokens: number | null;
}

//@ -----------------------------------------------------------------
//@ Interface:IMessage — Desc: Interface for the Message model
//@ -----------------------------------------------------------------
export interface IMessage {
  conversationId: Types.ObjectId;
  notebookId: Types.ObjectId;
  role: MessageRole;
  content: string;
  citations: Citation[];
  status: MessageStatus;
  model: string | null;
  usage: MessageUsage;
  errorMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

//@ -----------------------------------------------------------------
//@ Obj:messageSchema — Desc: Schema for the Message model
//@ -----------------------------------------------------------------
const messageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    citations: {
      type: [
        {
          sourceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Source",
            required: true,
          },

          chunkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DocumentChunk",
            default: null,
          },

          pageNumber: {
            type: Number,
            default: null,
          },

          quote: {
            type: String,
            default: null,
          },

          startOffset: {
            type: Number,
            default: null,
          },

          endOffset: {
            type: Number,
            default: null,
          },
        },
      ],
      default: [],
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },

    model: {
      type: String,
      default: null,
    },

    usage: {
      promptTokens: {
        type: Number,
        default: null,
      },

      completionTokens: {
        type: Number,
        default: null,
      },
    },

    errorMessage: {
      type: String,
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
//--  Indexes : Indexes for the message schema
//-- ------------------------------------------------------
messageSchema.index({
  conversationId: 1,
  createdAt: 1,
});

// Info: Create the Mongoose model for the message schema
const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
