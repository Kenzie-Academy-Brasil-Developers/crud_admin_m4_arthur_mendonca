import "dotenv/config";
import { QueryConfig, QueryResult } from "pg";
import { TLogin, TUserLoginReturn } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { compare } from "bcryptjs";
import { AppError } from "../../error";
import { sign } from "jsonwebtoken";

const loginUserService = async (loginData: TLogin): Promise<string> => {
  const requestData = loginData;

  const queryString: string = `
  SELECT password, id 
  FROM users
  WHERE 
  email = $1; 
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [requestData.email],
  };

  const queryResult: QueryResult<TUserLoginReturn> = await client.query(
    queryConfig
  );

  const userDataFromDatabase = queryResult.rows[0];

  const passwordMatch: boolean = await compare(
    requestData.password,
    userDataFromDatabase.password
  );

  if (!passwordMatch) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: requestData.email },
    process.env.SECRET_KEY!,
    { expiresIn: "24h", subject: String(userDataFromDatabase.id) }
  );

  return token;
};

export default loginUserService;

// String(requestData.password)
