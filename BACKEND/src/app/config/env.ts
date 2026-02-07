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
  PORT: Number(getEnv("PORT")), 
  NODE_ENVIROMENT: getEnv("NODE_ENVIROMENT"),
 FRONTEND_URL:getEnv('FRONTEND_URL'),
  BCRYPT_SALT_ROUND: Number(getEnv("BCRYPT_SALT_ROUND")),

  SUPER_ADMIN_PASSWORD: getEnv("SUPER_ADMIN_PASSWORD"),
  SUPER_ADMIN_EMAIL: getEnv("SUPER_ADMIN_EMAIL"),

  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),


  JWT_SECRET_TOKEN_EXPIRES:
    getEnv("JWT_SECRET_TOKEN_EXPIRES") as SignOptions["expiresIn"],

  JWT_REFRESH_TOKEN_EXPIRES:
    getEnv("JWT_REFRESH_TOKEN_EXPIRES") as SignOptions["expiresIn"],
    EMAIL_SENDER:{
      SMTP_PASSWORD:getEnv('SMTP_PASSWORD'),
      SMTP_PORT:getEnv('SMTP_PORT'),
      SMTP_USER:getEnv('SMTP_USER'),
      SMTP_FROM:getEnv('SMTP_FROM'),
      SMTP_HOST:getEnv('SMTP_HOST')
    },
    GOOGLE:{
      GOOGLE_CLIENT_ID:getEnv('GOOGLE_CLIENT_ID'),
      GOOGLE_CLIENT_SECRET:getEnv('GOOGLE_CLIENT_SECRET')

    }
};
