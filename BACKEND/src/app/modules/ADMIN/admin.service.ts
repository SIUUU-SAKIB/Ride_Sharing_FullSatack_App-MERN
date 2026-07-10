import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/createError";
import { IAdmin } from "./admin.interface";
import { AdminDB } from "./admin.model";
import { enviromentVariables } from "../../config/env";
import crypto from "crypto"
import bcrypt from "bcryptjs";
import { congratsToApproval, rejectEmali, sendVerifyEmail } from "../../utils/sendEmail";
import catchAsync from "../../utils/catchAsync";
import { UserDB } from "../USER/user.model";
import { IUser, IUserRole } from "../USER/user.interface";
import { DriverApplicationDB, DriverProfileDB } from "../DRIVER/driver.model";
import { IDriverApplication, IDriverStatus } from "../DRIVER/driver.interface";
import { Types } from "mongoose";


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
const getAllUser = async (
  page: number,
  limit: number,
  skip: number,
  search: string,
  isBlocked: string
) => {
  const query: any = {
    role: IUserRole.RIDER,
  };

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
      {
        phone: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }
  if (isBlocked === "true") {
    query.isBlocked = true
  }
  if (isBlocked === "false") {
    query.isBlocked = false
  }
  const allUsers = await UserDB.find(query)
    .skip(skip).sort({ createdAt: -1 })
    .limit(limit);
  const totalUsers = await UserDB.countDocuments(query);
  return {
    allUsers,
    totalUsers,
  };
};
const blockUser = async (_id: string) => {
  const user = await UserDB.findById(_id)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found")
  }
  user.isBlocked = true
  await user.save()

  return user
}
const unblockUser = async (_id: string) => {
  const user = await UserDB.findById(_id)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found")
  }
  user.isBlocked = false
  await user.save()
  return user
}
const updateUserByAdmin = async (id: string, payload: Partial<IUser>) => {
  const isUserExist = await UserDB.findById(id)
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found")
  }

  const user = await UserDB.findByIdAndUpdate(id, payload, {
    new: true, runValidators: true
  })

  return user
}

const getUserByRole = async (role: string, page: number, limit: number, skip: number) => {

  const user = await UserDB.find({ role: role.toUpperCase() }).skip(skip).limit(limit)
  const total = user.length
  return {
    user, total
  }
}

const getSingleUser = async (id: string) => {
  const user = await UserDB.findById(id)
  return user
}

const deleteUser = async (id: string) => {
  const isUserExist = await UserDB.findById(id)
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found")
  }
  return await UserDB.findByIdAndDelete(id)
}

const getAllAdmin = async (page: number, limit: number, skip: number) => {
  const allAdmin = await AdminDB.find().skip(skip).limit(limit)
  const totalAdmin = await AdminDB.countDocuments()
  return {
    allAdmin, totalAdmin
  }
}

const approveApplication = async (_id: string) => {
  const application = await DriverApplicationDB.findById(_id);
  const user = await UserDB.findById(application?.userId)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist")
  }
  if (user.role === IUserRole.DRIVER) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is already an driver")
  }
  if (!application) {
    throw new AppError(StatusCodes.NOT_FOUND, "Application not found");
  }

  if (application.status !== IDriverStatus.PENDING) {
    return {
      message: "Application already processed"
    }
  }

  application.status = IDriverStatus.APPROVED;
  user.role = IUserRole.DRIVER;
  await user.save()
  await application.save();

  const profile = {
    userId: application.userId,
    driverId: "DRV" + Date.now(),
    name: user.name,
    email: user.email,
    licenseImage: application.licenseImage,
    vehicleImage: application.vehicleImage,
    vehicleNumber: application.vehicleNumber,
    licenseNumber: application.licenseNumber,
    vehicleType: application.vehicleType,
    phoneNumber: application.phoneNumber,
    isActive: true,
    isBlocked: false,
    bloodType: application.bloodType,
    isAvailable: false,
    address: application.address,
  };

  const driverProfile = await DriverProfileDB.create(profile);
  await congratsToApproval(user.email, `${enviromentVariables.FRONTEND_URL}/dashboard`)
  return driverProfile;
};

const rejectApplication = async (_id: string, adminId: string, reason: string) => {
  const application = await DriverApplicationDB.findById(_id);
  const admin = await AdminDB.findById(adminId).populate("name email")
  if (!admin) {
    throw new AppError(StatusCodes.NOT_FOUND, "Admin not found")
  }
  if (!application) {
    throw new AppError(StatusCodes.NOT_FOUND, "Application not found");
  }
  const user = await UserDB.findById(application?.userId)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist")
  }

  if (application.status !== IDriverStatus.PENDING) {
    throw new AppError(400, "Application already processed");
  }

  application.status = IDriverStatus.REJECTED;
  application.reviewerEmail = admin.email
  application.reviewerName = admin.name
  application.reviewdAt = new Date();
  application.rejectionReason = reason || "No reason provided";

  await application.save();
  await rejectEmali(user.email, reason, `${enviromentVariables.FRONTEND_URL}/form/reapply`)
  return application;
}
const allApplications = async (page: number,
  limit: number,
  skip: number,
  search: string,
  applicationStatus: string) => {
  const query:any  = {}
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { vehicleName: { $regex: search, $options: "i" } },
      { vehicleType: { $regex: search, $options: "i" } }
      
    ]
  }

  const allApplications = await DriverApplicationDB.find(query).populate('userId', 'name profilePhoto').skip(skip).sort({createdAt:-1}).limit(limit)
  const totalApplications = await DriverApplicationDB.countDocuments(query)
  return {
    allApplications, totalApplications
  }
}
export const AdminService = {
  createAdmin,
  deleteAdmin,
  blockAdmin,
  getAllUser,
  getUserByRole,
  updateUserByAdmin,
  getSingleUser,
  deleteUser,
  getAllAdmin,
  approveApplication,
  rejectApplication,
  allApplications,
  blockUser,
  unblockUser
}