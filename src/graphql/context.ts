import { Request } from "express";
import { AppServices } from "../services";

export interface AppApolloContext {
  services: AppServices;
  userId?: string;
}

export default function createAppContext(req: Request, services: AppServices) {
  return { req, services, userId: services.authService.verifyUser(req) };
}
