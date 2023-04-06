import { Server } from "http";
import { Application } from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import {
  ApolloServer,
  ApolloServerExpressConfig,
  ExpressContext,
} from "apollo-server-express";
import createAppContext, { AppApolloContext } from "./context";
import { AppServices } from "../services";
import schema from "./schema";

export async function createApolloServer(
  app: Application,
  httpServer: Server,
  services: AppServices
): Promise<ApolloServer<AppApolloContext>> {
  const apolloConfig: ApolloServerExpressConfig = {
    context: ({ req }: ExpressContext) => createAppContext(req, services),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schema: schema,
  };

  const server = new ApolloServer<AppApolloContext>(apolloConfig);
  await server.start();

  server.applyMiddleware({ app });

  return server;
}
