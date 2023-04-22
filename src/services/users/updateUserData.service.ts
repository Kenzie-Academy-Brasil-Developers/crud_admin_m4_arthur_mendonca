import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { TUpdatedUserResponseSchema } from "../../interfaces/users.interfaces";
import { AppError } from "../../error";

const updateUserDataService = async (
  userIdFromRequest: number,
  userIdFromDataBase: number,
  userData: TUpdatedUserResponseSchema,
  userIsAdmin: boolean
): Promise<QueryResult | void> => {
  // console.log(userIdFromDataBase);
  // console.log(userIdFromRequest);
  if (userIsAdmin) {
    const queryFormat = format(
      `
      UPDATE users
      SET(%I) = ROW(%L)
      WHERE id = $1
      RETURNING id, "name", email, admin, active;
      `,
      Object.keys(userData),
      Object.values(userData)
    );

    const queryConfig: QueryConfig = {
      text: queryFormat,
      values: [userIdFromRequest],
    };

    const queryResult: QueryResult = await client.query(queryConfig);

    return queryResult.rows[0];
  } else {
    if (userIdFromRequest === userIdFromDataBase) {
      const queryFormat = format(
        `
      UPDATE users
      SET(%I) = ROW(%L)
      WHERE id = $1
      RETURNING id, "name", email, admin, active;
      `,
        Object.keys(userData),
        Object.values(userData)
      );

      const queryConfig: QueryConfig = {
        text: queryFormat,
        values: [userIdFromRequest],
      };

      const queryResult: QueryResult = await client.query(queryConfig);

      return queryResult.rows[0];
    } else {
      throw new AppError("Insufficient Permission", 403);
    }
  }
};

export default updateUserDataService;
