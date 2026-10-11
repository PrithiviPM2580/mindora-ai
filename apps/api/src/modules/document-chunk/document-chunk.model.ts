//! ============================================================
//! 🧱 Docuemnt Chunk Model — Data model definition for chunk
//! ============================================================

import mongoose, { Schema, type Types } from "mongoose";

//@ -----------------------------------------------------------------
//@ Interface:DocumentChunkMetadata — Desc: Metadata for the document chunk
//@ -----------------------------------------------------------------
interface DocumentChunkMetadata {
  startOffset: number | null;
  endOffset: number | null;
}

//@ -----------------------------------------------------------------
//@ Interface:IDocumentChunk — Desc: The data model for a document chunk
//@ -----------------------------------------------------------------
export interface IDocumentChunk {
  sourceId: Types.ObjectId;
  notebookId: Types.ObjectId;
  chunkIndex: number;
  text: string;
  pageNumber: number | null;
  sectionTitle: string | null;
  tokenCount: number | null;
  embedding?: number[];
  metadata: DocumentChunkMetadata;
  createdAt: Date;
  updatedAt: Date;
}

//@ -----------------------------------------------------------------
//@ Obj:documentChunkSchema — Desc: The Mongoose schema for the document chunk model
//@ -----------------------------------------------------------------
const documentChunkSchema = new Schema<IDocumentChunk>(
  {
    sourceId: {
      type: Schema.Types.ObjectId,
      ref: "Source",
      required: true,
      index: true,
    },
    notebookId: {
      type: Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
      index: true,
    },
    chunkIndex: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    pageNumber: {
      type: Number,
      default: null,
    },
    sectionTitle: {
      type: String,
      default: null,
    },
    tokenCount: {
      type: Number,
      default: null,
    },
    embedding: {
      type: [Number],
      default: undefined,
    },
    metadata: {
      startOffset: { type: Number, default: null },
      endOffset: { type: Number, default: null },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        const obj = ret as Record<string, unknown>;
        delete obj.embedding;
        delete obj.__v;
        return obj;
      },
    },
  },
);

//-- ------------------------------------------------------
//--  Indexes : Indexes for the document chunk schema
//-- ------------------------------------------------------
documentChunkSchema.index(
  {
    sourceId: 1,
    chunkIndex: 1,
  },
  {
    unique: true,
  },
);

//-- ------------------------------------------------------
//--  Indexes : Indexes for the document chunk schema
//-- ------------------------------------------------------
documentChunkSchema.index({
  notebookId: 1,
  sourceId: 1,
});

// Info: Create the Mongoose model for the document chunk schema
const DocumentChunk = mongoose.model<IDocumentChunk>("DocumentChunk", documentChunkSchema);

export default DocumentChunk;
