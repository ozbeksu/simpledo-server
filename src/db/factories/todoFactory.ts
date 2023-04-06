import { Faker } from "@faker-js/faker";
import { SeederFactoryConfig, setSeederFactory } from "typeorm-extension";
import { TodoEntity } from "../../entity";

export const TodosFactory: SeederFactoryConfig = setSeederFactory(
  TodoEntity,
  (f: Faker) => {
    const todo = new TodoEntity();

    todo.title = f.lorem.words(3);
    todo.completed = f.datatype.boolean();

    return todo;
  }
);
