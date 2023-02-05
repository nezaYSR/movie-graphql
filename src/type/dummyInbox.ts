import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { UserType } from "./userType";

export const DummyInboxType = new GraphQLObjectType({
  name: "DummyInbox",
  description: "This represents a User Inbox",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    username: { type: GraphQLNonNull(GraphQLString) },
    isRead: { type: GraphQLString },
    message: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: async (inbox) => {
        const connection = await getConnection();
        const userRepository = await connection.getRepository(User);

        const userFound = await userRepository.findOne({
          where: { id: inbox.userId },
        });
        return userFound;
      },
    },
  }),
});
