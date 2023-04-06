import { Faker } from "@faker-js/faker";
import { SeederFactoryConfig, setSeederFactory } from "typeorm-extension";
import { UserEntity } from "../../entity";
import { hash } from "argon2";

export const UsersFactory: SeederFactoryConfig = setSeederFactory(
  UserEntity,
  async (f: Faker) => {
    const user = new UserEntity();

    user.name = f.name.fullName();
    user.email = f.internet.email();
    user.password = await hash("secret");

    return user;
  }
);
