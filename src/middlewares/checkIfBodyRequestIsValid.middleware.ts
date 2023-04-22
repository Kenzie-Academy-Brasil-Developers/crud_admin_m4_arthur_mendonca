import { Request, Response, NextFunction } from "express";
import { ZodError, ZodTypeAny } from "zod";
import { AppError } from "../error";

const checkIfBodyRequestIsValidMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const data = schema.parse(request.body);
    request.body = data;

    return next();
  };

export default checkIfBodyRequestIsValidMiddleware;
