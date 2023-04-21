import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";

const deleteUserService = async (
  userIdFromRequest: number,
  userIdFromDataBase: number,
  userIsAdmin: boolean
): Promise<void> => {
  try {
    if (userIsAdmin) {
      const queryString: string = `
    UPDATE users 
    SET active = false 
    WHERE 
    id = $1; 
    `;

      const queryConfig: QueryConfig = {
        text: queryString,
        values: [userIdFromRequest],
      };

      const queryResult: QueryResult = await client.query(queryConfig);
    } else {
      if (userIdFromDataBase === userIdFromRequest) {
        const queryString: string = `
        UPDATE users 
        SET active = false 
        WHERE 
        id = $1; 
        `;

        const queryConfig: QueryConfig = {
          text: queryString,
          values: [userIdFromRequest],
        };

        const queryResult: QueryResult = await client.query(queryConfig);
      } else {
        throw new AppError("Insufficient Permission", 403);
      }
    }
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      throw new AppError("Insufficient Permission", 403);
    }
  }
};

export default deleteUserService;
