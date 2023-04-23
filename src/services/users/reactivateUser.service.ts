import { QueryConfig, QueryResult } from "pg";
import { TLogin, TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";
import { reactivateUserSchema } from "../../schemas/users.schemas";

const reactivateUserService = async (
  userId: number,
  userIsAdmin: boolean,
  checkIfUserIsActive: boolean
) => {
  const userIsActive = checkIfUserIsActive;

  if (!userIsAdmin) {
    throw new AppError("Insufficient Permission", 403);
  } else {
    const queryString: string = `
      SELECT * 
      FROM users  
      WHERE 
      id = $1;
    `;

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [userId],
    };

    const queryResult: QueryResult<TUser> = await client.query(queryConfig);

    console.log(queryResult.rows[0]);

    if (queryResult.rows[0].active === true) {
      throw new AppError("User already active", 400);
    }
    const queryStringReactivate: string = `
    UPDATE users
    SET active = true
    WHERE id = $1
    RETURNING id, name, email, admin, active;
    `;

    const queryConfigReactivate: QueryConfig = {
      text: queryStringReactivate,
      values: [userId],
    };

    const queryResultReactivate: QueryResult = await client.query(
      queryConfigReactivate
    );

    return queryResultReactivate.rows[0];
  }
};

export default reactivateUserService;
