import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { QueryConfig, QueryResult } from "pg";
import { TLogin } from "../interfaces/users.interfaces";
import { AppError } from "../error";

const validateUserLoginMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const loginData: TLogin = request.body;
  try {
    const queryString: string = `
    SELECT * FROM users 
    WHERE email = $1;
      `;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [loginData.email],
    };

    const queryResult: QueryResult = await client.query(queryConfig);

    if (queryResult.rows.length === 0) {
      throw new AppError("Wrong email/password", 401);
    }
    return next();
  } catch (error: any) {
    return response.status(401).json({
      message: error.message,
    });
  }
};

export default validateUserLoginMiddleware;
