import { StatusCodes } from "http-status-codes"
import AppError from "../../utils/createError"
import bcrypt from "bcryptjs";
import { createUserTokens } from "../../utils/tokens";
import { UserDB } from "../USER/user.model";
import { IUser } from "../USER/user.interface";
import { enviromentVariables } from "../../config/env";
import { verifyToken } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { sendOtp } from "../../utils/sendEmail";
import { AdminDB } from "../ADMIN/admin.model";
import { IAdmin } from "../ADMIN/admin.interface";
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const user = await UserDB.findOne({ email }).select("+password") || await AdminDB.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");
  }

  if (user.lockUntil && user.lockUntil > new Date()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Account locked. Try again later."
    );
  }

  if (!user.isVerified) {
    throw new AppError(StatusCodes.CONFLICT, "You're not verified yet");
  }

  const isPasswordMatched = await bcrypt.compare(
    password as string,
    user.password
  );

  if (!isPasswordMatched) {
    user.loginAttempt = (user.loginAttempt ?? 0) + 1;

    if (user.loginAttempt >= MAX_ATTEMPTS) {
      user.lockUntil = new Date(Date.now() + LOCK_TIME);
      user.loginAttempt = 0;
    }
    await user.save();
    throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect password");
  }
  user.loginAttempt = 0;
  user.lockUntil = null;
  await user.save();
  const tokenPayload = {
    _id: user._id,
    role: user.role,
  };

  const tokens = createUserTokens(tokenPayload);

  const { password: pass, ...rest } = user.toObject();

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: rest,
  };
};

const changePassword = async (id: string, oldPass: string, newPass: string) => {
  const user = await UserDB.findById(id).select("+password")
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist")
  }
  const isPasswordMatched = await bcrypt.compare(oldPass, user.password)
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Old password is incorrect.")
  }
  if (oldPass === newPass) {
    throw new AppError(StatusCodes.BAD_REQUEST, "New password must be different from old password")
  }
  const hashedPassword = await bcrypt.hash(newPass as string, Number(enviromentVariables.BCRYPT_SALT_ROUND))
  user.password = hashedPassword
  await user.save()
  return null
}

const refreshToken = async (refreshToken: string) => {
  const decodedToken = verifyToken(refreshToken, enviromentVariables.JWT_REFRESH_SECRET) as JwtPayload
  const user = await UserDB.findById(decodedToken._id)
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "User no longer exist")
  }
  return createUserTokens({
    _id: user._id?.toString(),
    role: user.role,
  })
}

const forgetPassword = async (email: string) => {
  const isUserExist = await UserDB.findOne({ email })
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "If account exists, OTP sent")
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  isUserExist.otp = otp
  isUserExist.otpExpires = new Date(Date.now() + 10 * 60 * 1000)
  await isUserExist.save()
  await sendOtp(
    isUserExist.email, "Reset Password Token", otp
  )
  return 'Password reset Link sent'
}

const resetPassword = async (payload: Record<string, any>, decodedToken: JwtPayload) => {
  if (payload._id != decodedToken._id) {
    throw new AppError(401, "You cannot reset password")
  }
  const isUserExist = await UserDB.findById(decodedToken._id)
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User does not exist')
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, Number(enviromentVariables.BCRYPT_SALT_ROUND))
  isUserExist.password = hashedPassword
  await isUserExist.save()

}
export const AuthService = { credentialsLogin, changePassword, refreshToken, forgetPassword, resetPassword }