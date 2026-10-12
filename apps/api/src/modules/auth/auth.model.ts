//! ============================================================
//! 🧱 User Model — Data model definition for user
//! ============================================================

import mongoose, { Schema } from "mongoose";
import { compareValue, hashValue } from "@/utils/bcrypt.util";

//@ -----------------------------------------------------------------
//@ Interface:Preferences — Desc: Interface for user preferences
//@ ---------------------------------------------------------------------
interface Preferences {
  theme: "light" | "dark" | "system";
  language: "en" | "es";
}

//@ -----------------------------------------------------------------
//@ Interface:IUser — Desc: Interface for the User model
//@ -----------------------------------------------------------------
export interface IUser {
  name: string;
  email: string;
  passwordHash: string | null;
  googleId: string | null;
  avatar: string | null;
  authProvider: "local" | "google";
  preferences: Preferences;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(password: string): Promise<boolean>;
}

//@ -----------------------------------------------------------------
//@ Obj:userSchema — Desc: Schema for the User model
//@ -----------------------------------------------------------------
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      default: null,
      trim: true,
    },
    googleId: {
      type: String,
      default: null,
      trim: true,
      sparse: true,
    },
    avatar: {
      type: String,
      default: null,
      trim: true,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
      required: true,
    },
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "system",
      },
      language: {
        type: String,
        enum: ["en", "es"],
        default: "en",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        const obj = ret as Record<string, unknown>;
        delete obj.passwordHash;
        delete obj.__v;
        return obj;
      },
    },
  },
);

//-- ------------------------------------------------------
//--  Indexes : Index on googleId field to ensure uniqueness for users authenticated via Google
//-- ------------------------------------------------------
userSchema.index(
  { googleId: 1 },
  { unique: true, partialFilterExpression: { googleId: { $type: "string" } } },
);

//-- ------------------------------------------------------
//--  Pre-save Hook : Hash the password before saving
//-- ------------------------------------------------------
userSchema.pre("save", async function () {
  if (!this.isModified("passwordHash") || !this.passwordHash) return;

  this.passwordHash = await hashValue(this.passwordHash);
});

//-- ------------------------------------------------------
//--  Instance Method : Compare password with hashed password
//-- ------------------------------------------------------
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  if (!this.passwordHash) return false;

  return compareValue(password, this.passwordHash);
};

// Info: Create a Mongoose model for the User schema
const User = mongoose.model<IUser>("User", userSchema);

export default User;
