import { Request } from "express";
import { AppServices } from "../services";
import { verifyUser } from "../utils";

export interface AppApolloContext {
  services: AppServices;
  userId?: string;
}

export default function createAppContext(req: Request, services: AppServices) {
  return { req, services, userId: verifyUser(req) };
}
