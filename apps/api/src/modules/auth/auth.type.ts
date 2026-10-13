//! ============================================================
//! 📝 Auth Types — Type definitions for auth
//! ============================================================

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface PublicUser {
  name: string;
  email: string;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface User extends AuthenticatedUser {}
  }
}
