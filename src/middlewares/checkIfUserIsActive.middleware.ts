import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const checkIfUserIsActiveMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  type TLoginData = {
    email: string;
    password: string;
  };

  const loginEmail: TLoginData = request.body.email;

  const queryString: string = `
    SELECT active 
    FROM users 
    WHERE email = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [loginEmail],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  const userIsActive: boolean = queryResult.rows[0].active;

  response.locals.userIsActive = userIsActive;

  return next();
};

export default checkIfUserIsActiveMiddleware;
