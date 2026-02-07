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
        googleId:{
          type:String
        },
        phone: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
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

        role: {
            type: String,
            enum: Object.values(IUserRole),
            default: IUserRole.RIDER
        },
        auths: [authProviderSchema]
    }, {
    timestamps: true,
    versionKey:false,
 

})

export const UserDB = model('User', UserSchema)