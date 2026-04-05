import { IUserRole } from "../USER/user.interface";

export interface IAdmin {
  _id?: string;

  name: string;
  email: string;
  password: string;

  role: IUserRole;

  isActive: boolean;
  isDeleted: boolean;

  lastLogin?: Date;

  permissions?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}