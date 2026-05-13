import { Response } from "express";
import { enviromentVariables } from "../config/env";
export interface AuthTokens {
    accessToken?: string,
    refreshToken?: string
}
export const setAuthCookie = (
  res: Response,
  tokenInfo: AuthTokens
) => {

  const isProduction =
    enviromentVariables.NODE_ENVIROMENT ===
    'production'

  if (tokenInfo.accessToken) {

    res.cookie(
      "accessToken",
      tokenInfo.accessToken,
      {
        httpOnly: true,

        secure: isProduction,

        sameSite: isProduction
          ? 'none'
          : 'lax'
      }
    )
  }

  if (tokenInfo.refreshToken) {

    res.cookie(
      "refreshToken",
      tokenInfo.refreshToken,
      {
        httpOnly: true,

        secure: isProduction,

        sameSite: isProduction
          ? 'none'
          : 'lax'
      }
    )
  }
}