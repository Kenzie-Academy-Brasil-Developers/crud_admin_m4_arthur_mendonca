// Recebe os dados de entrada da requisição e retorna a resposta ao usuário.
// Não deve conter lógica ou regra de negócio da aplicação.
import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.service";
import { TLogin, TUser } from "../interfaces/users.interfaces";
import { listUsersService } from "../services/listUsers.service";
import { createUserSchema, userSchema } from "../schemas/users.schemas";
import loginUserService from "../services/login/loginUser.service";
import getLoggedUserService from "../services/getLoggedUser.service";
import updateUserDataService from "../services/updateUserData.service";

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
  const listUsers = await listUsersService();

  return response.json(listUsers);
};

const loginUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginUser: TLogin = request.body;

  const token = await loginUserService(loginUser);

  return response.json(token);
};

const getLoggedUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId = response.locals.userId;

  const getLoggedUser = await getLoggedUserService(userId);

  return response.status(200).json(getLoggedUser);
};

const updateUserDataController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userIdFromDataBase = Number(response.locals.userId);
  const userIdFromRequest = Number(request.params.id);
  const userIsAdmin = response.locals.admin;

  const updatedUser = await updateUserDataService(
    userIdFromRequest,
    userIdFromDataBase,
    request.body,
    userIsAdmin
  );

  return response.status(200).json(updatedUser);
};

export {
  createUserController,
  listUsersController,
  loginUserController,
  getLoggedUserController,
  updateUserDataController,
};
