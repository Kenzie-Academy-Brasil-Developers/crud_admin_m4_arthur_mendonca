import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.service";
import { TUser } from "../interfaces/users.interfaces";
import { listUsersService } from "../services/users/listUsers.service";
import {
  createUserSchema,
  createUserSchemaResponse,
} from "../schemas/users.schemas";
import getLoggedUserService from "../services/users/getLoggedUser.service";
import updateUserDataService from "../services/users/updateUserData.service";
import deleteUserService from "../services/users/deleteUser.service";
import reactivateUserService from "../services/users/reactivateUser.service";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: TUser = createUserSchemaResponse.parse(request.body);

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

  console.log(userIdFromDataBase);
  console.log(userIdFromRequest + 1);
  console.log(userIsAdmin);

  const updatedUser = await updateUserDataService(
    userIdFromRequest,
    userIdFromDataBase,
    request.body,
    userIsAdmin
  );

  return response.status(200).json(updatedUser);
};

const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userIdFromRequest = Number(request.params.id);
  const userIsAdmin = response.locals.admin;
  const userIdFromDataBase = Number(response.locals.userId);

  const softDeleteUser = await deleteUserService(
    userIdFromRequest,
    userIdFromDataBase,
    userIsAdmin
  );

  return response.status(204).json(softDeleteUser);
};

const reactivateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId = Number(request.params.id);
  const userIsActive: boolean = response.locals.userIsActive;
  const admin = response.locals.admin;

  const reactivate = await reactivateUserService(userId, admin, userIsActive);

  return response.status(200).json(reactivate);
};

export {
  createUserController,
  listUsersController,
  getLoggedUserController,
  updateUserDataController,
  deleteUserController,
  reactivateUserController,
};
