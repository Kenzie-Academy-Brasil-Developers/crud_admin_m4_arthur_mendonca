// Recebe os dados de entrada da requisição e retorna a resposta ao usuário.
// Não deve conter lógica ou regra de negócio da aplicação.
import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.service";
import { IUser, TLogin, TUser } from "../interfaces/users.interfaces";
import { listUsersService } from "../services/listUsers.service";
import { createUserSchema, userSchema } from "../schemas/users.schemas";
import loginUserService from "../services/login/loginUser.service";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: TUser = createUserSchema.parse(request.body);

  const newUser: TUser = await createUserService(userData);

  return response.status(201).json(newUser);
};

const listUsersController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const listUsers = listUsersService();

  return response.status(200).json(listUsers);
};

const loginUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginUser: TLogin = request.body;

  const token = await loginUserService(loginUser);

  return response.json(token);
};

export { createUserController, listUsersController, loginUserController };
