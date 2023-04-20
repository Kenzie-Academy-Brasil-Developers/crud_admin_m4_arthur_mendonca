import { TUser, IUser } from "../../interfaces/users.interfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import format from "pg-format";
import { userSchema } from "../../schemas/users.schemas";
import { hash } from "bcryptjs";

const createUserService = async (userData: TUser): Promise<IUser> => {
  const hashedPassword: string = await hash(userData.password, 10);

  userData.password = hashedPassword;

  const queryString: string = `
    INSERT INTO 
    users (%I)
    values (%L)
    RETURNING *;
    `;

  const queryFormat = format(
    queryString,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: QueryResult<IUser> = await client.query(queryFormat);

  return userSchema.parse(queryResult.rows[0]);
};

export { createUserService };
