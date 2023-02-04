import { GraphQLObjectType } from "graphql";
import { movieQueries } from "../queries/movieQueries";
import { actorQueries } from "../queries/actorQueries";
import { authorQueries } from "../queries/authorQueries";

export const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    // Movies Query - anyone can access
    movies: movieQueries.movies,
    // Movie Detail Query - user must login to see detail
    movie: movieQueries.movie,
    // Author Query - anyone can access
    authors: authorQueries.authors,
    // Author Detail Query - user must login to see detail
    author: authorQueries.author,
    // Actor Query - anyone can access
    actors: actorQueries.actors,
    // Actor Detail Query - user must login to see detail
    actor: actorQueries.actor,
  }),
});
