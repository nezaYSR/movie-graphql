import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { User } from "./User";

@Entity()
export class DummyInbox extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne((type) => User, (author) => author.dummyInboxes)
  user: User;

  @Column({ nullable: false })
  username: string;

  @Column()
  message: string;

  @Column({ type: "boolean", default: false })
  isRead: boolean;
}
