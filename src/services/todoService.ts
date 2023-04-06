import { ITodoRepository } from "../repositories/todoRepository";
import { IUserService } from "./userService";
import { Todo } from "../graphql/resolversTypes.generated";

const STATUS = {
  Complete: true,
  Incomplete: false,
};

export default class TodoService {
  private readonly userService: IUserService;
  private readonly repository: ITodoRepository;

  constructor(userService: IUserService, repository: ITodoRepository) {
    this.userService = userService;
    this.repository = repository;
  }

  async findAll(userId: string): Promise<Todo[]> {
    return this.repository.find({
      where: { user: { id: userId } },
      relations: { user: false },
    });
  }

  async createTodo(title: string, userId: string): Promise<Todo> {
    const user = await this.userService.findUser(userId);

    return await this.repository.createTodo(title, user);
  }

  async deleteTodo(id: string, userId: string): Promise<boolean> {
    const { affected } = await this.repository.delete({
      id,
      user: { id: userId },
    });

    return Boolean(affected);
  }

  async markTodoComplete(id: string, userId: string): Promise<Todo> {
    return await this.repository.setTodoStatus(id, userId, STATUS.Complete);
  }

  async markTodoIncomplete(id: string, userId: string): Promise<Todo> {
    return await this.repository.setTodoStatus(id, userId, STATUS.Incomplete);
  }
}
