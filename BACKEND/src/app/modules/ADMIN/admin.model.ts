import { model, Schema } from "mongoose";
import { IAdmin, IAdminRole } from "./admin.interface";

const AdminSchema = new Schema<IAdmin>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            enum: Object.values(IAdminRole),
            default: IAdminRole.ADMIN
        },
        isActive: {
            type: Boolean,
            default: true
        },
        verificationToken: {
            type: String,
            default: undefined
        }, verificationTokenExpires: {
            type: Date,
            default: undefined
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        lastLogin: {
            type: Date
        },
        permissions: {
            type: [String]
        }
    }, {
    versionKey: false,
    timestamps: true
}
)

export const AdminDB = model('admin', AdminSchema)