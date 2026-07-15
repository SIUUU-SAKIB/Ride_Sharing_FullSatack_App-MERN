import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { IAdmin } from "./admin.interface"
import AppError from "../../utils/createError"
import { StatusCodes } from "http-status-codes"
import { AdminService } from "./admin.service"
import sendResponse from "../../utils/sendResponse"
import { AdminDB } from "./admin.model"
import { enviromentVariables } from "../../config/env"
import { DriverApplicationDB } from "../DRIVER/driver.model"
import { UserService } from "../USER/user.service"

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const payload: Partial<IAdmin> = req.body
    if (!payload) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Admin payload is required')
    }
    const result = await AdminService.createAdmin(payload)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.ACCEPTED,
        message: "Admin created successfully, now verify the email to complete the final registration.",
        data: result
    })
})
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
    const { admin_id } = req.params
    if (!admin_id) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Admin id is required")
    }
    const result = await AdminService.deleteAdmin(admin_id as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Admin deleted sucessfully",
        data: result
    })
})
const blockAdmin = catchAsync(async (req: Request, res: Response) => {
    const { admin_id } = req.params
    if (!admin_id) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Admin id is required")
    }
    const result = await AdminService.blockAdmin(admin_id as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Admin blocked successfully",
        data: result
    })
})
const verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.query;
    const user = await AdminDB.findOne({
        verificationToken: token,
        verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
        return res.redirect(`${enviromentVariables.FRONTEND_URL}/token-expired`)
    }
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpires = undefined
    await user.save()
    res.redirect(`https://www.pexels.com/`)
})
const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const {
        page = "1",
        limit = "5",
        search = "",
        isBlocked
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const result = await AdminService.getAllUser(
        pageNumber,
        limitNumber,
        skip,
        search as string,
        isBlocked as string
    );

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "All users retrieved successfully 😍",
        meta: {
            total: result.totalUsers,
            page: pageNumber,
            limit: limitNumber,
            totalPage: Math.ceil(result.totalUsers / limitNumber),
        },
        data: result.allUsers,
    });
});

const blockUser = catchAsync(async (req: Request, res: Response) => {
    const user_id = req.params.id
    if (!user_id) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User id is required")
    }
    const result = await AdminService.blockUser(user_id as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User blocked successfully",
        data: result
    })
})
const unblockUser = catchAsync(async (req: Request, res: Response) => {
    const user_id = req.params.id
    if (!user_id) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User id is required")
    }
    const result = await AdminService.unblockUser(user_id as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User unblocked successfully",
        data: result
    })
})


const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
    const { page = "1", limit = "10" } = req.query
    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const skip = (pageNumber - 1) * limitNumber
    const result = await AdminService.getAllAdmin(pageNumber, limitNumber, skip)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "All admins fetched successfully",
        meta: { total: result.totalAdmin, page: pageNumber, limit: limitNumber, totalPage: Math.ceil(result.totalAdmin / limitNumber) },
        data: result
    })

})
const updateUserByAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await AdminService.updateUserByAdmin(id as string, payload)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `User updated by ${req.user?.role} successfully`,
        data: result,
    })

})

const getUserByRole = catchAsync(async (req: Request, res: Response) => {
    const { role } = req.params
    const { page = '1', limit = '10' } = req.query
    if (!role) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Role is required")
    }
    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const skip = (pageNumber - 1) * limitNumber
    const result = await AdminService.getUserByRole(role as string, pageNumber, limitNumber, skip)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `All ${role} retrived successfully 😍`,
        meta: {
            total: result.total, page: pageNumber,
            limit: limitNumber,
            totalPage: Math.ceil(result.total / limitNumber)
        },
        data: result.user

    })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    if (!req.user?._id) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthrized request")
    }
    const { id } = req.params
    await AdminService.deleteUser(id as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `Account deleted successfully`,
        data: null,
    })

})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        throw new AppError(StatusCodes.BAD_REQUEST, "No id received !")
    }
    const result = await AdminService.getSingleUser(id as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `User with ID ${result?._id} fetched successfully.`,
        data: result
    })

})

const approveApplication = catchAsync(async (req: Request, res: Response) => {
    const { applicationId } = req.params;
    if (!applicationId) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Application ID required")
    }

    const result = await AdminService.approveApplication(applicationId as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.ACCEPTED,
        message: "Application approved",
        data: result
    })
})

const rejectApplication = catchAsync(async (req: Request, res: Response) => {
    const { applicationId } = req.params
    const adminId = req.user?._id
    const { reason } = req.body
    if (!applicationId) {
        throw new AppError(StatusCodes.NOT_FOUND, "Application ID required")
    }
    if (!adminId) {
        throw new AppError(StatusCodes.NOT_FOUND, "Admin ID required")
    }
    const result = await AdminService.rejectApplication(applicationId as string, adminId, reason)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Your aplication was Rejected",
        data: result
    })
})

const allApplications = catchAsync(async (req: Request, res: Response) => {
    const { page = 1,
        limit = 5,
        search,
        status } = req.query
    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const skip = (pageNumber - 1) * limitNumber

    const result = await AdminService.allApplications(
        pageNumber,
        limitNumber,
        skip,
        search as string,
        status as string)
    console.log(result)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "All drivers retrieved successfully 😍",
        meta: {
            total: result.totalApplications,
            page: pageNumber,
            limit: limitNumber,
            totalPage: Math.ceil(result.totalApplications / limitNumber),
        },
        data: result.allApplications
    });
})
export const AdminController = {
    createAdmin,
    verifyEmail,
    deleteAdmin,
    blockAdmin,
    updateUserByAdmin,
    getAllUser,
    getUserByRole,
    getSingleUser,
    deleteUser,
    getAllAdmin,
    approveApplication,
    rejectApplication,
    allApplications,
    blockUser,
    unblockUser
}

