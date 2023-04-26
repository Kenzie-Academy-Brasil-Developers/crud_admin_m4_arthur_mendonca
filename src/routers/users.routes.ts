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
import checkIfUserIsActiveMiddleware from "../middlewares/checkIfUserIsActive.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  checkIfBodyRequestIsValidMiddleware(createUserSchema),
  checkIfEmailExistsMiddleware,
  createUserController
);
userRoutes.get(
  "",
  checkBearerTokenMiddleware,
  checkIfAdminMiddleware,
  listUsersController
);
userRoutes.get("/profile", checkBearerTokenMiddleware, getLoggedUserController); // Listar um usuário que está logado na aplicação
userRoutes.patch(
  "/:id",
  checkUserIdMiddleware,
  checkBearerTokenMiddleware,
  checkIfBodyRequestIsValidMiddleware(updatedUserResponseSchema),
  updateUserDataController
);
userRoutes.delete(
  "/:id",
  checkUserIdMiddleware,
  checkBearerTokenMiddleware,
  deleteUserController
);
userRoutes.put(
  "/:id/recover",
  checkUserIdMiddleware,
  checkBearerTokenMiddleware,
  reactivateUserController
);

export default userRoutes;
