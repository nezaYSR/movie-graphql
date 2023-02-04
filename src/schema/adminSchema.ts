import { GraphQLSchema } from "graphql";
import { RootMutationType } from "../root/mutation";

export const adminSchema = new GraphQLSchema({
  mutation: RootMutationType,
});
