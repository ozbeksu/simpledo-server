import { IUserRepository } from "../repositories/userRepository";
import { User } from "../graphql/resolversTypes.generated";
import { hashPassword, signToken, verifyPassword } from "../utils";

export default class AuthService {
  private readonly repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await hashPassword(password);
    const user = await this.repository.createUser(name, email, hashedPassword);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: signToken({ userId: user.id }),
      todos: [],
    };
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email },
      relations: { todos: true },
    });

    if (!user) throw Error("User not found");

    const isValidPassword = await verifyPassword(user.password, password);
    if (!isValidPassword) throw new Error("Invalid password");

    return { ...user, token: signToken({ userId: user.id }) };
  }
}
