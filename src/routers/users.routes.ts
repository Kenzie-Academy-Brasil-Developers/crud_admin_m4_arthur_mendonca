import { Router } from "express";
import {
  createUserController,
  listUsersController,
} from "../controllers/users.controllers";
import { checkIfEmailExistsMiddleware } from "../middlewares/checkIfEmailExists.middleware";

const userRoutes: Router = Router();

userRoutes.post("", checkIfEmailExistsMiddleware, createUserController); //Cadastrar um novo usuário
userRoutes.get("", listUsersController); // Listar todos os usuários da aplicação
userRoutes.get("/profile"); // Listar um usuário que está logado na aplicação
userRoutes.patch("/:id"); // Atualizar os dados de um usuário
userRoutes.delete("/:id"); // Fazer um soft delete de um usuário
userRoutes.put(":id/recover"); // Reativar um usuário

export default userRoutes;
