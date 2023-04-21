import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../error";

const checkIfBodyRequestIsValidMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const validBody = schema.parse(request.body);

    request.body = validBody;
    return next();
  };

export default checkIfBodyRequestIsValidMiddleware;
