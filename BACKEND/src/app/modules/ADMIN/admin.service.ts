import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/createError";
import { IAdmin } from "./admin.interface";
import { AdminDB } from "./admin.model";
import { enviromentVariables } from "../../config/env";
import crypto from "crypto"
import bcrypt from "bcryptjs";
import { sendVerifyEmail } from "../../utils/sendEmail";
import catchAsync from "../../utils/catchAsync";


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
  // const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const hashedPassword = await bcrypt.hash(password, 10);

  const link = `http://localhost:${enviromentVariables.PORT}/api/v1/admin/verify-email?token=${token}`;;

  const newAdminData = {
    ...rest,
    password: hashedPassword,
    isVerified: false,
    verificationToken: token,
    verificationTokenExpires: new Date(Date.now() + 60 * 60 * 1000),
  };

  const result = await AdminDB.create(newAdminData);

  await sendVerifyEmail(result.email, "Verify Admin Email", link);

  return result;
};

const deleteAdmin = async (_id: string) => {
  const admin = await AdminDB.findById(_id)
  if (!admin) {
    throw new AppError(StatusCodes.NOT_FOUND, "Admin not found")
  }
  if (admin.role === `SUPER_ADMIN`) {
    throw new AppError(StatusCodes.FORBIDDEN, "You can't delete a super admin")
  }
  admin.isDeleted = true
  await admin.save()
  return admin
}

const blockAdmin = async (_id: string) => {
  const admin = await AdminDB.findById(_id)
  if (!admin) {
    throw new AppError(StatusCodes.NOT_FOUND, "Admin not found")
  }
  admin.isBlocked = true
  await admin.save()
  return admin
}

export const AdminService = { createAdmin, deleteAdmin, blockAdmin }