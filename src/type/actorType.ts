import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import { getConnection } from "typeorm";
import { Movie } from "../entity/Movie";
import { MovieToActor } from "../entity/MovieToActor";
import { MovieType } from "./movieType";

export const ActorType: any = new GraphQLObjectType({
  name: "Actor",
  description: "This represents an Actor of a Movie",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    picLink: { type: GraphQLString },
    birthDate: { type: GraphQLString },
    movies: {
      type: GraphQLList(MovieType),
      resolve: async (actor) => {
        const connection = await getConnection();
        const movieToActorRepository = await connection.getRepository(
          MovieToActor
        );
        const movieRepository = await connection.getRepository(Movie);

        let movieList: Array<Movie> = [];

        const moviesWithThisActorRelationFound =
          await movieToActorRepository.find({
            where: { actorId: actor.id },
          });

        for (
          let i: number = 0;
          i < moviesWithThisActorRelationFound.length;
          i++
        ) {
          const movieFound = await movieRepository.findOne({
            where: { id: moviesWithThisActorRelationFound[i].movieId },
          });

          if (movieFound) {
            movieList.push(movieFound);
          }
        }

        return movieList;
      },
    },
  }),
});
