import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

const checkIfAdminMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const admin = response.locals.admin;
  const userIdFromDataBase = Number(response.locals.userId);
  const userIdFromRequest = Number(request.params.id);

  if (!admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default checkIfAdminMiddleware;
