import { Request, Response } from "express";
import { TLogin } from "../interfaces/users.interfaces";
import loginUserService from "../services/login/loginUser.service";

const loginUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginUser: TLogin = request.body;

  const token = await loginUserService(loginUser);

  return response.status(200).json({ token });
};

export default loginUserController;
