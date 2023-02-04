import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import AuthorControllers from "../controllers/authorControllers";
import { AuthorType } from "../type/authorType";

export const authorQueries = {
  authors: {
    type: new GraphQLList(AuthorType),
    description: "List of All Authors - anyone can access",
    resolve: AuthorControllers.seeAuthorList,
  },
  author: {
    type: AuthorType,
    description: "An Author Detail - user must login",
    args: {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
    },
    resolve: AuthorControllers.seeAuthorDetail,
  },
};
