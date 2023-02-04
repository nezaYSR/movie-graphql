import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { UserType } from "../type/userType";
import AuthControllers from "../controllers/authControllers";

export const authMutations = {
  userSignin: {
    type: UserType,
    description: "User Signing in",
    args: {
      username: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: AuthControllers.signin,
  },
  userSignout: {
    type: UserType,
    description: "User Signing out",
    resolve: AuthControllers.signout,
  },
  registerUser: {
    type: UserType,
    description: "Admin registering a User - only for admin",
    args: {
      username: { type: GraphQLNonNull(GraphQLString) },
      role: { type: GraphQLString },
    },
    resolve: AuthControllers.registerUser,
  },
};
