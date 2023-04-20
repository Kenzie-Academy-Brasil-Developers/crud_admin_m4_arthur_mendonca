import { QueryResult } from "pg";
import { client } from "../database";
import { IUser } from "../interfaces/users.interfaces";

const listUsersService = async (): Promise<Array<IUser>> => {
  const queryString: string = `
    SELECT * 
    FROM users
    RETURNING *;
    `;

  const queryResult: QueryResult = await client.query(queryString);

  return queryResult.rows;
};

export { listUsersService };
