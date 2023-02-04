import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { DummyInbox } from "./DummyInbox";

export enum Role {
  ASSIST = "admin-support",
  USER = "user",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ type: "date" })
  joinDate: Date;

  @OneToMany((type) => DummyInbox, (dummyInbox) => dummyInbox.user)
  dummyInboxes: DummyInbox[];
}
