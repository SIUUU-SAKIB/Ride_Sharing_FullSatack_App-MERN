import { model, Schema } from "mongoose";
import { IAuthProvider, IUser, IUserRole } from "./user.interface";
import { date } from "zod";

const authProviderSchema = new Schema<IAuthProvider>({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, {
    versionKey: false,
    _id: false
})


const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        googleId: {
            type: String
        },
        phone: {
            type: String,
            unique: true,
            required:false,
            sparse:true,
            trim:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        baseLocation:{type:String, required:true, trim:true},
        password: {
            type: String,
            select: false
        }, isActive: {
            type: Boolean,
            default: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: Object.values(IUserRole),
            default: IUserRole.RIDER
        },
        profilePhoto: {
            type: String
        },

        profilePhotoId: {
            type: String,
        },
        verificationToken: {
            type: String, default: undefined
        },
        verificationTokenExpires: {
            type: Date, default: undefined
        },
        otp: {
            type: String, default: undefined
        },
        otpExpires: {
            type: Date, default: undefined
        },
        auths: [authProviderSchema],
        loginAttempt: {
            type: Number,
            default: 0
        },
        lockUntil: {
            type: Date,
            default: null
        }
    }, {
    timestamps: true,
    versionKey: false,


})
.index(
    { verificationTokenExpires: 1 },
    {
        expireAfterSeconds: 0,
        partialFilterExpression: { isVerified: false },
    }
);

export const UserDB = model('User', UserSchema)