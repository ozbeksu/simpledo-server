import { UserEntity } from "../entity";
import { IUserRepository } from "../repositories/userRepository";

export interface IUserService {
  findUser(id: string): Promise<UserEntity>;
}

export default class UserService implements IUserService {
  private readonly repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async findUser(id: string): Promise<UserEntity> {
    const user = await this.repository.findUser(id);

    if (!user) throw Error("User not found");

    return user;
  }
}
