import { QueryResult } from "pg";
import { client } from "../../database";
import { TUser } from "../../interfaces/users.interfaces";

const listUsersService = async (): Promise<Array<TUser>> => {
  const queryString: string = `
  SELECT 
  id, name, email, admin, active 
  FROM users;
  `;

  const queryResult: QueryResult = await client.query(queryString);

  return queryResult.rows;
};

export { listUsersService };
