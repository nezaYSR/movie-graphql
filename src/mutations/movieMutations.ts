import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import MovieControllers from "../controllers/movieControllers";
import { MovieType } from "../type/movieType";

export const movieMutations = {
  addMovie: {
    type: MovieType,
    description: "Add a Movie - only for admin or admin-support",
    args: {
      title: { type: GraphQLString },
      picLink: { type: GraphQLString },
      releaseDate: { type: GraphQLString },
      author_id: { type: GraphQLInt },
      actorIdList: { type: GraphQLList(GraphQLInt) },
    },
    resolve: MovieControllers.addMovie,
  },
  editMovie: {
    type: MovieType,
    description: "Edit a Movie - only for admin or admin-support",
    args: {
      id: { type: GraphQLNonNull(GraphQLInt) },
      title: { type: GraphQLString },
      picLink: { type: GraphQLString },
      releaseDate: { type: GraphQLString },
    },
    resolve: MovieControllers.editMovie,
  },
  deleteMovie: {
    type: MovieType,
    description: "Delete a Movie - only for admin or admin-support",
    args: {
      id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: MovieControllers.deleteMovie,
  },
};
