import { Router } from "express";
import { AdminController } from "./admin.controller";
import { authentication } from "../../middleware/authentication";
import { AuthController } from "../AUTH/auth.controller";
import { IAdminRole } from "./admin.interface";
import { validateZodSchema } from "../../middleware/validate";
import { AdminValidation } from "./admin.validation";

const router = Router()

// *GET ALL USERS

router.get(`/get-all-users`,
    authentication(IAdminRole.ADMIN, IAdminRole.SUPER_ADMIN
    ),
    AdminController.getAllUser);

    // *SEE ALL APPLICATIONS

router.get(`/all-applications`,
     authentication(IAdminRole.ADMIN, IAdminRole.SUPER_ADMIN),
      AdminController.allApplications)
// *GET USER BY ROLE

router.get(`/get-users-by-role`,
    authentication(IAdminRole.ADMIN, IAdminRole.SUPER_ADMIN),
    AdminController.getUserByRole)

// *UPDATE USER 

router.patch(`/update-user-by-admin/:id`,
    authentication(IAdminRole.ADMIN, IAdminRole.SUPER_ADMIN),
    AdminController.updateUserByAdmin)

// * APPROVE DRIVER APPLICATION

router.patch(`/approve/:applicationId`,
    authentication(IAdminRole.ADMIN, IAdminRole.SUPER_ADMIN),
    AdminController.approveApplication)

// *GET SINGLE USER

router.get(`/get-single-user/:id`,
    authentication(IAdminRole.ADMIN, IAdminRole.SUPER_ADMIN),
    AdminController.getSingleUser)

// *REJECT APPLICATION

router.patch(`/reject-application/:applicationId`,
    authentication(IAdminRole.ADMIN, IAdminRole.SUPER_ADMIN),
    validateZodSchema(AdminValidation.rejectApplication),
    AdminController.rejectApplication)


// ---------------------------------------------------------------------
// ** ONLY SUPER_ADMIN CAN CREATE, BLOCK AND DELETE ADMIN 

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