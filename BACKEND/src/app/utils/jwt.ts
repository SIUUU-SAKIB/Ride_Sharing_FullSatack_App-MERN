import jwt, { JsonWebTokenError, JwtPayload, SignOptions, TokenExpiredError } from "jsonwebtoken"

import { JwtUserPayload } from "../modules/USER/user.interface";

export const generateToken = (
  payload: JwtUserPayload,
  secret: string,
  expiresIn: SignOptions["expiresIn"]
) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw error;
    }
    if (error instanceof JsonWebTokenError) {
      throw error;
    }
    throw error;
  }
};