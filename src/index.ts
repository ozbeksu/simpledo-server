import { createServer } from "http";
import express, { Express } from "express";
import { createApolloServer } from "./graphql/server";
import { dataSource } from "./db/dataSource";
import config from "./config";
import { createServices } from "./services";

const app: Express = express();

async function init() {
  await dataSource.initialize();

  const apolloServer = await createApolloServer(
    app,
    createServer(app),
    createServices()
  );

  await new Promise<void>((resolve) =>
    app.listen(config.port, () => {
      console.log(`http://localhost:${config.port}${apolloServer.graphqlPath}`);
      resolve();
    })
  );
}

init().catch((err) => console.error(err));
