import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import UserControllers from "../controllers/userControllers";
import { DummyInboxType } from "../type/dummyInbox";
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
  seeInbox: {
    type: new GraphQLList(DummyInboxType),
    args: {
      username: { type: GraphQLNonNull(GraphQLString) },
    },
    description:
      "List of Messages of certain username - anyone with username can access",
    resolve: UserControllers.seeInbox,
  },
};
