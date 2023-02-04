import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import ActorControllers from "../controllers/actorControllers";
import { ActorType } from "../type/actorType";

export const actorQueries = {
  actors: {
    type: new GraphQLList(ActorType),
    description: "List of All Actors - anyone can access",
    resolve: ActorControllers.seeActorList,
  },
  actor: {
    type: ActorType,
    description: "An Actor Detail - user must login",
    args: {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
    },
    resolve: ActorControllers.seeActorDetail,
  },
};
