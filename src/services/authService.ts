import { IUserRepository } from "../repositories/userRepository";
import { User } from "../graphql/resolversTypes.generated";
import { hash, verify } from "argon2";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import config from "../config";

export default class AuthService {
  private readonly repository: IUserRepository;
  private readonly jwtSecret: string;

  constructor(repository: IUserRepository, jwtSecret: string) {
    this.repository = repository;
    this.jwtSecret = jwtSecret;
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    const user = await this.repository.createUser(name, email, hashedPassword);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: this.signToken(user.id),
      todos: [],
    };
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email },
      relations: { todos: true },
    });

    if (!user) throw Error("User not found");

    const isValidPassword = await verify(user.password, password);
    if (!isValidPassword) throw new Error("Invalid password");

    return { ...user, token: this.signToken(user.id) };
  }

  verifyUser(req: Request): string {
    const { authorization } = req.headers;

    if (!authorization) return null;

    const token = authorization.replace("Bearer ", "");
    if (!token) throw new Error("Unauthorized access");

    const payload = jwt.verify(token, config.jwtSecret) as JwtPayload;

    return payload?.userId;
  }

  private signToken(userId: string) {
    return jwt.sign({ userId }, this.jwtSecret);
  }

  private async hashPassword(password: string): Promise<string> {
    return await hash(password);
  }
}
