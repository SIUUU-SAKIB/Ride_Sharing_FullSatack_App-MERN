import dotenv from "dotenv"
import createError from "../utils/createError"
import { StatusCodes } from "http-status-codes"
import { SignOptions } from "jsonwebtoken";

dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue;

  if (value === undefined) {
    throw new createError(
      StatusCodes.NOT_FOUND,
      `NO ENVIRONMENT VARIABLE FOUND: ${key} 😔`
    );
  }

  return value;
};

export const enviromentVariables = {
  DATABASE_URL: getEnv("DATABASE_URL"),
  PORT: Number(getEnv("PORT")), // 🔥 should be number
  NODE_ENVIROMENT: getEnv("NODE_ENVIROMENT"),

  BCRYPT_SALT_ROUND: Number(getEnv("BCRYPT_SALT_ROUND")),

  SUPER_ADMIN_PASSWORD: getEnv("SUPER_ADMIN_PASSWORD"),
  SUPER_ADMIN_EMAIL: getEnv("SUPER_ADMIN_EMAIL"),

  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),

  // ✅ THIS IS THE FIX
  JWT_SECRET_TOKEN_EXPIRES:
    getEnv("JWT_SECRET_TOKEN_EXPIRES") as SignOptions["expiresIn"],

  JWT_REFRESH_TOKEN_EXPIRES:
    getEnv("JWT_REFRESH_TOKEN_EXPIRES") as SignOptions["expiresIn"],
};
