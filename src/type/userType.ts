import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a User",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    username: { type: GraphQLNonNull(GraphQLString) },
    joinDate: { type: GraphQLString },
  }),
});
