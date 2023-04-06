import { addResolversToSchema } from "@graphql-tools/schema";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { applyMiddleware } from "graphql-middleware";
import createResolvers from "./resolvers";
import { guards } from "./guards";
import { root } from "../utils/paths";

const SCHEMA = addResolversToSchema({
  resolvers: createResolvers(),
  schema: loadSchemaSync(`${root}/schema.graphql`, {
    loaders: [new GraphQLFileLoader()],
  }),
});

const schema = applyMiddleware(SCHEMA, guards);

export default schema;
