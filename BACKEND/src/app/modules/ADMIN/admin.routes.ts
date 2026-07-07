import { Router } from "express";
import { AdminController } from "./admin.controller";
import { authentication } from "../../middleware/authentication";
import { AuthController } from "../AUTH/auth.controller";
import { IAdminRole } from "./admin.interface";
import { validateZodSchema } from "../../middleware/validate";
import { AdminValidation } from "./admin.validation";

const router = Router()


// *USER ROUTES ================================================

// *all user
router.get(`/get-all-users`,
    authentication(IAdminRole.ADMIN,
        IAdminRole.SUPER_ADMIN
    ),
    AdminController.getAllUser);

// *block user
router.patch('/block-user/:id', authentication(IAdminRole.ADMIN,
    IAdminRole.SUPER_ADMIN),
    AdminController.blockUser)
// *SEE ALL APPLICATIONS

// *unblock user
router.patch(`/unblock-user/:id`, authentication(IAdminRole.ADMIN,
    IAdminRole.SUPER_ADMIN),
    AdminController.unblockUser)

// *delete user
router.delete(`/delete-user/:id`, authentication(IAdminRole.ADMIN,
    IAdminRole.SUPER_ADMIN), AdminController.deleteUser)

// *get user by role
router.get(`/get-users-by-role`,
    authentication(IAdminRole.ADMIN,
        IAdminRole.SUPER_ADMIN),
    AdminController.getUserByRole)

// *update user
router.patch(`/update-user-by-admin/:id`,
    authentication(IAdminRole.ADMIN, IAdminRole.SUPER_ADMIN),
    AdminController.updateUserByAdmin)

// *single user
router.get(`/get-single-user/:id`,
    authentication(IAdminRole.ADMIN, IAdminRole.SUPER_ADMIN),
    AdminController.getSingleUser)
// *--------------------------------------------------------------------------------


// *DRIVER ROUTES=====================================================================

// *get all applications
router.get(`/all-applications`,
    authentication(IAdminRole.ADMIN, IAdminRole.SUPER_ADMIN),
    AdminController.allApplications)

// * approve application
router.patch(`/approve/:applicationId`,
    authentication(IAdminRole.ADMIN, IAdminRole.SUPER_ADMIN),
    AdminController.approveApplication)

// *reject application
router.patch(`/reject-application/:applicationId`,
    authentication(IAdminRole.ADMIN, IAdminRole.SUPER_ADMIN),
    validateZodSchema(AdminValidation.rejectApplication),
    AdminController.rejectApplication)

//* ---------------------------------------------------------------------

// *SUPER ADMIN ROUTES ⭐
// ** ONLY SUPER_ADMIN CAN CREATE, BLOCK AND DELETE ADMIN ============================================================

router.get(`/get-all-admins`,
    authentication(IAdminRole.SUPER_ADMIN
    ),
    AdminController.getAllAdmin);
router.post(`/create`,
    authentication(IAdminRole.SUPER_ADMIN),
    validateZodSchema(AdminValidation.zodSchema), AdminController.createAdmin);

router.post(`/block/:admin_id`,
    authentication(IAdminRole.SUPER_ADMIN),
    AdminController.blockAdmin);

router.post(`/delete/:admin_id`,
    authentication(IAdminRole.SUPER_ADMIN),
    AdminController.deleteAdmin)

router.get(`/verify-email`,
    AdminController.verifyEmail)

router.post(`/logout`,
    AuthController.logout)

export const AdminRoutes = router