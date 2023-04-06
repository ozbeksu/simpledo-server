import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import TodoEntity from "./TodoEntity";
import { Todo } from "../graphql/resolversTypes.generated";

@Entity("users")
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 60 })
  name: string;

  @Index()
  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @OneToMany(() => TodoEntity, (todo: TodoEntity) => todo.user)
  todos: Todo[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
