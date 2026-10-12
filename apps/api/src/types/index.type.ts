//! ============================================================
//! 📝 Types — Type definitions
//! ============================================================

import type { TypedRequestHandler } from "zod-express-validator";

export type Controller<T> = TypedRequestHandler<T>;
