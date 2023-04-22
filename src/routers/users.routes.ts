import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getLoggedUserController,
  listUsersController,
  reactivateUserController,
  updateUserDataController,
} from "../controllers/users.controllers";
import { checkIfEmailExistsMiddleware } from "../middlewares/checkIfEmailExists.middleware";
import checkBearerTokenMiddleware from "../middlewares/checkBearerToken.middleware";
import checkIfBodyRequestIsValidMiddleware from "../middlewares/checkIfBodyRequestIsValid.middleware";
import {
  createUserSchema,
  createUserSchemaResponse,
  updatedUserResponseSchema,
} from "../schemas/users.schemas";
import checkIfAdminMiddleware from "../middlewares/checkIfAdmin.middleware";
import checkUserIdMiddleware from "../middlewares/checkUserId.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  checkIfBodyRequestIsValidMiddleware(createUserSchema),
  checkIfEmailExistsMiddleware,
  createUserController
); //Cadastrar um novo usuário
userRoutes.get(
  "",
  checkBearerTokenMiddleware,
  checkIfAdminMiddleware,
  listUsersController
); // Listar todos os usuários da aplicação
userRoutes.get("/profile", checkBearerTokenMiddleware, getLoggedUserController); // Listar um usuário que está logado na aplicação
userRoutes.patch(
  "/:id",
  checkUserIdMiddleware,
  checkIfBodyRequestIsValidMiddleware(updatedUserResponseSchema),
  checkBearerTokenMiddleware,
  checkIfAdminMiddleware,
  updateUserDataController
); // Atualizar os dados de um usuário
userRoutes.delete(
  "/:id",
  checkUserIdMiddleware,
  checkBearerTokenMiddleware,
  deleteUserController
); // Fazer um soft delete de um usuário
userRoutes.put("/:id/recover", checkUserIdMiddleware, reactivateUserController); // Reativar um usuário

export default userRoutes;
