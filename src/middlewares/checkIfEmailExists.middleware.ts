import { NextFunction, Request, Response, response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

type TEmail = {
  email: string;
};

const checkIfEmailExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email: TEmail = request.body;

  try {
    const queryString: string = `
  SELECT * 
  FROM users
  WHERE email = $1;
  `;

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [email.email],
    };

    const queryResult: QueryResult = await client.query(queryConfig);

    if (queryResult.rowCount > 0) {
      throw new AppError("E-mail already registered", 409);
    }
    return next();
  } catch (error: any) {
    return response.status(409).json({
      message: error.message,
    });
  }
};

export { checkIfEmailExistsMiddleware };
