import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const checkBearerTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = request.headers.authorization;
  let userId: number = 0;

  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }

    userId = decoded?.sub;
  });

  const queryString: string = `
  SELECT id, "name", email, admin, active 
  FROM users 
  WHERE 
  id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  const admin: boolean = queryResult.rows[0].admin;

  response.locals.admin = admin;

  response.locals.userId = queryResult.rows[0].id;

  response.locals.userIsActive = queryResult.rows[0].active;

  return next();
};

export default checkBearerTokenMiddleware;
