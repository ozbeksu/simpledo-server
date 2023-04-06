import { Faker } from "@faker-js/faker";
import { SeederFactoryConfig, setSeederFactory } from "typeorm-extension";
import { UserEntity } from "../../entity";
import { hashPassword } from "../../utils";

export const UsersFactory: SeederFactoryConfig = setSeederFactory(
  UserEntity,
  async (f: Faker) => {
    const user = new UserEntity();

    user.name = f.name.fullName();
    user.email = f.internet.email();
    user.password = await hashPassword("secret");

    return user;
  }
);
