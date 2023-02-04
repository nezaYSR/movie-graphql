import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { MovieToActor } from "./MovieToActor";

@Entity()
export class Actor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => MovieToActor, (movieToActor) => movieToActor.actor)
  moviesToActors: MovieToActor[];

  @Column()
  name: string;

  @Column()
  picLink: string;

  @Column({ type: "date" })
  birthDate: Date;
}
