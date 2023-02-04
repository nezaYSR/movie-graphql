import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import * as dotenv from "dotenv";
import { InputValidationError } from "../errorHandlers/customErrorHandler";
dotenv.config();

interface UserPayload {
  username: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const Authentication = async (
  _parent: null,
  args: any,
  context: any
) => {
  try {
    const payload: any = jwt.verify(
      context.session.jwt!,
      process.env.JWT_PASS!
    ) as UserPayload;

    if (payload) {
      return payload;
    } else {
      throw new InputValidationError("Token invalid", "id", 404);
    }
  } catch (error) {
    throw new InputValidationError(
      "Please Login to access this page",
      "id",
      404
    );
  }
};
