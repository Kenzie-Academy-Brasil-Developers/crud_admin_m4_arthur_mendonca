import { TypeOf, z } from "zod";
import {
  loginSchema,
  passwordSchema,
  userLoginInfo,
  userSchema,
  updateUserSchema,
  updatedUserResponseSchema,
  reactivateUserSchema,
} from "../schemas/users.schemas";

type TUser = z.infer<typeof userSchema>;

type TLogin = z.infer<typeof loginSchema>;

type TPassword = z.infer<typeof passwordSchema>;

type TUserLoginInfo = z.infer<typeof userLoginInfo>;

type TUserLoginReturn = Omit<TUserLoginInfo, "email">;

type TUpdateUserRequest = z.infer<typeof updateUserSchema>;

type TUpdatedUserResponseSchema = z.infer<typeof updatedUserResponseSchema>;

type TReactivateUser = z.infer<typeof reactivateUserSchema>;

export {
  TUser,
  TLogin,
  TPassword,
  TUserLoginInfo,
  TUserLoginReturn,
  TUpdateUserRequest,
  TUpdatedUserResponseSchema,
  TReactivateUser,
};
