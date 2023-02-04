import { GraphQLSchema } from "graphql";
import { RootQueryType } from "../root/query";

export const userSchema = new GraphQLSchema({
  query: RootQueryType,
});
