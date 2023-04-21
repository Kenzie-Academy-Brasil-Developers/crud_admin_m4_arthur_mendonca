import { QueryConfig, QueryResult } from "pg";
import { TLogin } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";

const reactivateUserService = async (
  userId: number,
  userIsAdmin: boolean,
  checkIfUserIsActive: boolean
) => {
  const userIsActive = checkIfUserIsActive;

  if (userIsActive) {
    throw new AppError("User already active", 400);
  } else {
    if (userIsAdmin) {
      const queryString: string = `
      UPDATE users 
      SET active = true 
      WHERE 
      id = $1;
    `;

      const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId],
      };

      const queryResult: QueryResult = await client.query(queryConfig);

      const queryStringResponse: string = `
      SELECT * 
      FROM users 
      WHERE id = $1
      RETURNING *;
      `;

      const queryConfigResponse: QueryConfig = {
        text: queryStringResponse,
        values: [userId],
      };

      const queryResultResponse: QueryResult = await client.query(
        queryConfigResponse
      );

      return queryResultResponse.rows[0];
    } else {
      throw new AppError("Insufficient Permission", 403);
    }
  }
};

export default reactivateUserService;
