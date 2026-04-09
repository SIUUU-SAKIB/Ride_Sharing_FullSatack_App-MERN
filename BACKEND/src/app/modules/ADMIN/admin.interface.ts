export enum IAdminRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  SUPER_ADMIN = "SUPER_ADMIN"
}


export interface IAdmin {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: IAdminRole;
  isActive?: boolean;
  isVerified?:boolean,
  isDeleted?: boolean;
  isBlocked?:boolean,
  lastLogin?: Date;
  permissions?: string[];
  verificationToken?: string,
  verificationTokenExpires?: Date,
  createdAt?: Date;
  updatedAt?: Date;
    loginAttempt?: number,
    lockUntil?: Date | null
}