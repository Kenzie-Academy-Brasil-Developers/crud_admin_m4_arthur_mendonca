import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken";
import { decode } from "punycode";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { userAdminSchema } from "../schemas/users.schemas";

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

    userId = decoded.sub;
    console.log(decoded.sub);

    response.locals.userId = decoded.sub;
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

  return next();
};

export default checkBearerTokenMiddleware;
