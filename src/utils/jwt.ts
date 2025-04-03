import jwt, { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET!;
const DEFAULT_EXPIRY = 24 * 60 * 60;

export interface JwtPayload extends BaseJwtPayload {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const generateToken = (
  payload: any | JwtPayload,
  expiresIn: number = DEFAULT_EXPIRY
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, { expiresIn }, (error, token) => {
      if (error) {
        reject(error);
      } else resolve(token as string);
    });
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY) as JwtPayload;
};
