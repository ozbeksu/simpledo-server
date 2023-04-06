import { ExpressContext } from "apollo-server-express";
import { QueryResolvers } from "../resolversTypes.generated";
import { AppApolloContext } from "../context";

const queryResolvers: QueryResolvers<AppApolloContext & ExpressContext> = {
  async listTodos(_, _args, { services, userId }) {
    return await services.todoService.findAll(userId);
  },
};

export default queryResolvers;
