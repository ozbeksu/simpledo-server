import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export function verifyToken(token: string): JwtPayload | string {
  return jwt.verify(token, config.jwtSecret);
}
