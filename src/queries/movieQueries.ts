import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import MovieControllers from "../controllers/movieControllers";
import { MovieType } from "../type/movieType";

export const movieQueries = {
  movies: {
    type: new GraphQLList(MovieType),
    description: "List of All Movies - anyone can access",
    resolve: MovieControllers.seeMovieList,
  },
  movie: {
    type: MovieType,
    description: "A Movie Detail - user must login",
    args: {
      id: { type: GraphQLInt },
      title: { type: GraphQLString },
      releaseDate: { type: GraphQLString },
    },
    resolve: MovieControllers.seeMovieDetail,
  },
};
