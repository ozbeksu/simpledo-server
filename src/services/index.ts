import UserService from "./userService";
import { UserRepository } from "../repositories/userRepository";
import TodoService from "./todoService";
import { TodoRepository } from "../repositories/todoRepository";
import AuthService from "./authService";
import config from "../config";

export type AppServices = {
  authService: AuthService;
  userService: UserService;
  todoService: TodoService;
};

export function createServices(): AppServices {
  const authService = new AuthService(UserRepository, config.jwtSecret);
  const userService = new UserService(UserRepository);
  const todoService = new TodoService(userService, TodoRepository);

  return { userService, todoService, authService };
}
