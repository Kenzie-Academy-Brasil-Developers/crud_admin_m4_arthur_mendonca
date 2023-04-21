import { Router } from "express";
import { loginUserController } from "../controllers/users.controllers";
import validateUserLoginMiddleware from "../middlewares/validateUserLogin.middleware";
import checkIfUserIsActiveMiddleware from "../middlewares/checkIfUserIsActive.middleware";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  checkIfUserIsActiveMiddleware,
  validateUserLoginMiddleware,
  loginUserController
); // Logar com um usuário na aplicação gerando um token.

export default loginRoutes;
