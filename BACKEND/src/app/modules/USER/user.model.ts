import { model, Schema } from "mongoose";
import { IUser, IUserRole } from "./user.interface";

const UserSchema = new Schema<IUser>({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        select: false
    }, isActive: {
        type: Boolean,
        default: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },

    role: {
        type: String,
        enum: Object.values(IUserRole),
        default: IUserRole.RIDER
    }
})

export const UserDB = model('User', UserSchema)