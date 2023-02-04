import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import AuthorControllers from "../controllers/authorControllers";
import { AuthorType } from "../type/authorType";

export const authorMutations = {
  addAuthor: {
    type: AuthorType,
    description: "Add an Author - only for admin or admin-support",
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      picLink: { type: GraphQLString },
      birthDate: { type: GraphQLString },
    },
    resolve: AuthorControllers.addAuthor,
  },
  editAuthor: {
    type: AuthorType,
    description: "Edit an Author - only for admin or admin-support",
    args: {
      id: { type: GraphQLNonNull(GraphQLInt) },
      newName: { type: GraphQLString },
      newPicLink: { type: GraphQLString },
      newBirthDate: { type: GraphQLString },
    },
    resolve: AuthorControllers.editAuthor,
  },
  deleteAuthor: {
    type: AuthorType,
    description: "Delete an Author - only for admin or admin-support",
    args: {
      id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: AuthorControllers.deleteAuthor,
  },
};
