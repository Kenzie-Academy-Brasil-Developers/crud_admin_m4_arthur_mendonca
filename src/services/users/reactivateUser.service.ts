import { QueryConfig, QueryResult } from "pg";
import { TLogin, TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";
import { updatedUserResponseSchema } from "../../schemas/users.schemas";

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
    } else {
      const queryStringReactivate: string = `
      UPDATE users
      SET active = true
      WHERE
      id = $1;`;

      const queryConfigReactivate: QueryConfig = {
        text: queryStringReactivate,
        values: [userId],
      };

      const queryResultReactivate: QueryResult = await client.query(
        queryConfigReactivate
      );

      const reactivateUser = updatedUserResponseSchema.parse(
        queryResultReactivate.rows[0]
      );

      return reactivateUser;
    }
  }
};

export default reactivateUserService;

//   else if(!userIsAdmin){

//   const queryStringResponse: string = `
//   SELECT *
//   FROM users
//   WHERE id = $1
//   RETURNING *;
//   `;

//   const queryConfigResponse: QueryConfig = {
//     text: queryStringResponse,
//     values: [userId],
//   };

//   const queryResultResponse: QueryResult = await client.query(
//     queryConfigResponse
//   );

//   return queryResultResponse.rows[0];

// } else {
//   throw new AppError("Insufficient Permission", 403);
// }
