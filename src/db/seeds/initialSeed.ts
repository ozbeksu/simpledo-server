import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { TodoEntity, UserEntity } from "../../entity";

export default class DatabaseSeed implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ) {
    const users = await factoryManager.get(UserEntity).saveMany(3);

    const todos = await Promise.all(
      Array(30)
        .fill(1)
        .map(async () => {
          return await factoryManager.get(TodoEntity).make({
            user: faker.helpers.arrayElement(users),
          });
        })
    );

    await dataSource.getRepository(TodoEntity).save<TodoEntity>(todos);
  }
}
