import jwt from "jsonwebtoken";
import config from "../config";

export function signToken(data: { userId: string }): string {
  return jwt.sign(data, config.jwtSecret);
}
