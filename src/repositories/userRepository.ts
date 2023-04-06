import { UserEntity } from "../entity";
import { dataSource } from "../db/dataSource";
import { Repository } from "typeorm";

type ExtendedUserRepository = {
  findUser(id: string): Promise<UserEntity>;
  createUser(
    name: string,
    email: string,
    password: string
  ): Promise<UserEntity>;
};

export type IUserRepository = Repository<UserEntity> & ExtendedUserRepository;

export const UserRepository: IUserRepository = dataSource
  .getRepository(UserEntity)
  .extend<ExtendedUserRepository>({
    async findUser(id: string): Promise<UserEntity> {
      return await this.findOne({
        where: { id },
        relations: { todos: true },
      });
    },

    async createUser(
      name: string,
      email: string,
      password: string
    ): Promise<UserEntity> {
      const user = new UserEntity();
      user.name = name;
      user.email = email;
      user.password = password;

      return await this.save(user);
    },
  });
