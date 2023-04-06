import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import UserEntity from "./UserEntity";
import { User } from "../graphql/resolversTypes.generated";

@Entity("todos")
export default class TodoEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Index()
  @Column({ length: 100 })
  title: string;

  @Index()
  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.todos)
  @JoinColumn({ name: "userId" })
  user: User;
}
