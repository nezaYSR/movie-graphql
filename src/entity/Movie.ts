import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Author } from "./Author";
import { Actor } from "./Actor";
import { MovieToActor } from "./MovieToActor";
@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  authorId: number;

  @ManyToOne((type) => Author, (author) => author.movie, {
    onDelete: "SET NULL",
  })
  author: Author;

  @OneToMany(() => MovieToActor, (movieToActor) => movieToActor.movie)
  moviesToActors: MovieToActor[];

  @Column({ nullable: false })
  title: string;

  @Column()
  picLink: string;

  @Column({ type: "date" })
  releaseDate: Date;
}
