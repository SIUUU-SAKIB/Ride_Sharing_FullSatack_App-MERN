import { enviromentVariables } from "../config/env";
import { IUser } from "../modules/USER/user.interface";
import { generateToken } from "./jwt";

export const createUserTokens = (user: Partial<IUser>) => {
  if (!user ) {
    throw new Error("createUserTokens called with invalid user");
  }

  const jwtPayload = {
    userId: user._id?.toString(),
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    enviromentVariables.JWT_SECRET,
    enviromentVariables.JWT_SECRET_TOKEN_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload,
    enviromentVariables.JWT_REFRESH_SECRET,
    enviromentVariables.JWT_REFRESH_TOKEN_EXPIRES
  );

  return { accessToken, refreshToken };
};
