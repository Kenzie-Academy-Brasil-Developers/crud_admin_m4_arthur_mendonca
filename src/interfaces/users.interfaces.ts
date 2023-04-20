import { z } from "zod";
import {
  loginSchema,
  passwordSchema,
  userLoginInfo,
  userSchema,
} from "../schemas/users.schemas";

type IUser = z.infer<typeof userSchema>;

type TUser = z.infer<typeof userSchema>;

type TLogin = z.infer<typeof loginSchema>;

type TPassword = z.infer<typeof passwordSchema>;

type TUserLoginInfo = z.infer<typeof userLoginInfo>;

type TUserLoginReturn = Omit<TUserLoginInfo, "email">;

export { IUser, TUser, TLogin, TPassword, TUserLoginInfo, TUserLoginReturn };
