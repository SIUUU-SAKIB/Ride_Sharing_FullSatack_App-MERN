export enum IAdminRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR"
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
  lastLogin?: Date;
  permissions?: string[];
  verificationToken?: string,
  verificationTokenExpires?: Date,
  createdAt?: Date;
  updatedAt?: Date;
}