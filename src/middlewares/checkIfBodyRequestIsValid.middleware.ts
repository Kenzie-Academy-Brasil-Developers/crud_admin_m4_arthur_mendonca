import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const checkIfBodyRequestIsValidMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const data = schema.parse(request.body);
    request.body = data;

    return next();
  };

export default checkIfBodyRequestIsValidMiddleware;
