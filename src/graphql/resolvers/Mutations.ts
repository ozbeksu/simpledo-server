import { MutationResolvers, Todo, User } from "../resolversTypes.generated";
import { AppApolloContext } from "../context";

const mutationResolvers: MutationResolvers<AppApolloContext> = {
  async login(_, args, { services }): Promise<User> {
    const { email, password } = args.input;

    return await services.authService.login(email, password);
  },

  async signUp(_, args, { services }): Promise<User> {
    const { name, email, password } = args.input;

    return await services.authService.register(name, email, password);
  },

  async createTodo(_, args, { services, userId }): Promise<Todo> {
    const { title } = args.input;

    return await services.todoService.createTodo(title, userId);
  },

  async deleteTodo(_, args, { services, userId }): Promise<boolean> {
    const { id } = args.input;

    return services.todoService.deleteTodo(id, userId);
  },

  async markTodoCompleted(_, args, { services, userId }): Promise<Todo> {
    const { id } = args.input;

    return await services.todoService.markTodoComplete(id, userId);
  },

  async markTodoUncompleted(_, args, { services, userId }): Promise<Todo> {
    const { id } = args.input;

    return await services.todoService.markTodoIncomplete(id, userId);
  },
};

export default mutationResolvers;
