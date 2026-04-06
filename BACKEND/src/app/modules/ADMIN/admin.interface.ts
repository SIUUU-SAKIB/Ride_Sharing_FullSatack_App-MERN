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
  isActive: boolean;
  isDeleted: boolean;
  lastLogin?: Date;
  permissions?: string[];
  verificationToken?:string,
  verificationTokenExpires?:string,
  createdAt?: Date;
  updatedAt?: Date;
}