import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "./verifyToken";

export function verifyUser(req: Request): string {
  const { authorization } = req.headers;

  if (!authorization) return null;

  const token = authorization.replace("Bearer ", "");
  if (!token) throw new Error("Unauthorized access");

  const payload = verifyToken(token) as JwtPayload;

  return payload?.userId;
}
