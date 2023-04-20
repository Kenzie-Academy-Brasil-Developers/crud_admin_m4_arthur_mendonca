import { Router } from "express";
import { loginUserController } from "../controllers/users.controllers";
import validateUserLoginMiddleware from "../middlewares/validateUserLogin.middleware";

const loginRoutes: Router = Router();

loginRoutes.post("", loginUserController); // Logar com um usuário na aplicação gerando um token.

export default loginRoutes;
