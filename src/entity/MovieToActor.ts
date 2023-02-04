import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Actor } from "./Actor";
import { Movie } from "./Movie";

@Entity()
export class MovieToActor {
  @PrimaryGeneratedColumn()
  movieToActorId: number;

  @Column()
  movieId: number;

  @Column()
  actorId: number;

  @ManyToOne(() => Movie, (movie) => movie.moviesToActors)
  movie: Movie;

  @ManyToOne(() => Actor, (actor) => actor.moviesToActors)
  actor: Actor;
}
