import { Response } from "express";
import { enviromentVariables } from "../config/env";
export interface AuthTokens {
    accessToken?: string,
    refreshToken?: string
}
export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: enviromentVariables.NODE_ENVIROMENT === 'production',
            sameSite: 'none'
        })
    }

    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            httpOnly: true,
            secure: enviromentVariables.NODE_ENVIROMENT === 'production',
            sameSite: 'none'
        })
    }
}