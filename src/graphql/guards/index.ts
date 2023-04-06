import { shield } from "graphql-shield";
import { isAuthenticated } from "./rules";
import config from "../../config";

export const guards = shield(
  {
    Query: {
      listTodos: isAuthenticated,
    },
    Mutation: {
      createTodo: isAuthenticated,
      markTodoCompleted: isAuthenticated,
      markTodoUncompleted: isAuthenticated,
      deleteTodo: isAuthenticated,
    },
  },
  { debug: config.debug }
);
