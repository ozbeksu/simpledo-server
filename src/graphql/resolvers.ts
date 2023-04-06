import { Resolvers } from "./resolversTypes.generated";
import mutationResolvers from "./resolvers/Mutations";
import queryResolvers from "./resolvers/Query";
import { AppApolloContext } from "./context";

export default function createResolvers(): Resolvers<AppApolloContext> {
  return {
    Query: queryResolvers,
    Mutation: mutationResolvers,
  };
}
