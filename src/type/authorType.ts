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
import { MovieType } from "./movieType";

export const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents an author of a movie",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    picLink: { type: GraphQLString },
    birthDate: { type: GraphQLString },
    movies: {
      type: GraphQLList(MovieType),
      resolve: async (author) => {
        const connection = await getConnection();
        const movieRepository = await connection.getRepository(Movie);

        const moviesMadeByThisAuthorFound: Array<Movie> =
          await movieRepository.find({
            where: { authorId: author.id },
          });

        return moviesMadeByThisAuthorFound;
      },
    },
  }),
});
