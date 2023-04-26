import { Router } from "express";
import validateUserLoginMiddleware from "../middlewares/validateUserLogin.middleware";
import checkIfUserIsActiveMiddleware from "../middlewares/checkIfUserIsActive.middleware";
import loginUserController from "../controllers/login.controllers";
import checkIfBodyRequestIsValidMiddleware from "../middlewares/checkIfBodyRequestIsValid.middleware";
import { loginSchema } from "../schemas/users.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  checkIfBodyRequestIsValidMiddleware(loginSchema),
  validateUserLoginMiddleware,
  loginUserController
);

export default loginRoutes;
