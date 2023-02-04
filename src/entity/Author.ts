import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => Movie, (movie) => movie.author)
  movie: Movie[];

  @Column()
  name: string;

  @Column()
  picLink: string;

  @Column({ type: "date" })
  birthDate: Date;
}
