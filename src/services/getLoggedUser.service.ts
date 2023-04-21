import { Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const getLoggedUserService = async (userId: number): Promise<Response> => {
  const queryString: string = `
  SELECT 
  id, "name", email, admin, active
  FROM users
  WHERE id = $1;
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default getLoggedUserService;
