import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import UserControllers from "../controllers/userControllers";
import { UserType } from "../type/userType";

export const userMutations = {
  changePassword: {
    type: UserType,
    description: "Change password - only for self & non admin",
    args: {
      password: { type: GraphQLNonNull(GraphQLString) },
      newPassword: { type: GraphQLString },
    },
    resolve: UserControllers.changePassword,
  },
};
