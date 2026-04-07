import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/createError";
import { IAdmin } from "./admin.interface";
import { AdminDB } from "./admin.model";
import { enviromentVariables } from "../../config/env";
import { bcryptHashing } from "../../utils/bcrypt";
import crypto from "crypto"
import bcrypt from "bcryptjs";
import { sendVerifyEmail } from "../../utils/sendEmail";


const createAdmin = async (payload: Partial<IAdmin>) => {
  const { password, ...rest } = payload;

  if (!password) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Password is required");
  }

  const existingAdmin = await AdminDB.findOne({ email: payload.email });

  if (existingAdmin) {
    throw new AppError(StatusCodes.CONFLICT, "Admin already exists");
  }

  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const hashedPassword = await bcrypt.hash(password, 10);

  const link = `http://localhost:${enviromentVariables.PORT}/api/v1/auth/verify-admin-email?token=${token}`;

  const newAdminData = {
    ...rest,
    password: hashedPassword,
    isVerified: false,
    verificationToken: hashedToken,
    verificationTokenExpires: new Date(Date.now() + 60 * 60 * 1000),
  };

  const result = await AdminDB.create(newAdminData);

  await sendVerifyEmail(result.email, "Verify Admin Email", link);

  return result;
};

export const AdminService = {createAdmin}