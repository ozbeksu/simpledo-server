import { Repository } from "typeorm";
import { TodoEntity, UserEntity } from "../entity";
import { dataSource } from "../db/dataSource";

export type ExtendedTodoRepository = {
  findByIdForUser(id: string, userId: string): Promise<TodoEntity>;
  createTodo(title: string, user: UserEntity): Promise<TodoEntity>;
  setTodoStatus(
    id: string,
    userId: string,
    status: boolean
  ): Promise<TodoEntity>;
};

export type ITodoRepository = Repository<TodoEntity> & ExtendedTodoRepository;

export const TodoRepository: ITodoRepository = dataSource
  .getRepository<TodoEntity>(TodoEntity)
  .extend<ExtendedTodoRepository>({
    async findByIdForUser(id: string, userId: string) {
      const todo: TodoEntity = await this.findOne({
        where: { id: id, user: { id: userId } },
      });

      if (!todo) throw Error("Todo is not found");

      return todo;
    },

    async createTodo(title: string, user: UserEntity): Promise<TodoEntity> {
      const todo = new TodoEntity();
      todo.title = title;
      todo.user = user;

      return await this.save(todo);
    },

    async setTodoStatus(
      id: string,
      userId: string,
      status: boolean
    ): Promise<TodoEntity> {
      const todo: TodoEntity = await this.findByIdForUser(id, userId);

      todo.completed = status;

      return await this.save(todo);
    },
  });
