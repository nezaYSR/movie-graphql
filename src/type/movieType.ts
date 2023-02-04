import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import { getConnection } from "typeorm";
import { ActorType } from "./actorType";
import { AuthorType } from "./authorType";
import { Author } from "../entity/Author";
import { Movie } from "../entity/Movie";
import { Actor } from "../entity/Actor";
import { MovieToActor } from "../entity/MovieToActor";

export const MovieType: any = new GraphQLObjectType({
  name: "Movie",
  description:
    "This represents a Movie made by an Author and played by an Actor",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    picLink: { type: GraphQLString },
    releaseDate: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: async (movie) => {
        const connection = await getConnection();
        const authorRepository = await connection.getRepository(Author);

        const authorFound = await authorRepository.findOne({
          where: { id: movie.authorId },
        });

        return authorFound;
      },
    },
    actor: {
      type: GraphQLList(ActorType),
      resolve: async (movie) => {
        const connection = await getConnection();
        const actorRepository = await connection.getRepository(Actor);
        const movieToActorRepository = await connection.getRepository(
          MovieToActor
        );

        let actorList: Array<Actor> = [];

        const actorToMovieRelationFound = await movieToActorRepository.find({
          where: { movieId: movie.id },
        });

        for (let i: number = 0; i < actorToMovieRelationFound.length; i++) {
          const actorFound = await actorRepository.findOne({
            where: { id: actorToMovieRelationFound[i].actorId },
          });

          if (actorFound) {
            actorList.push(actorFound);
          }
        }

        return actorList;
      },
    },
  }),
});
