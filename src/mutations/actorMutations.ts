import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import ActorControllers from "../controllers/actorControllers";
import { ActorType } from "../type/actorType";

export const actorMutations = {
  addActor: {
    type: ActorType,
    description: "Add an Actor - only for admin or admin-support",
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      picLink: { type: GraphQLString },
      birthDate: { type: GraphQLString },
    },
    resolve: ActorControllers.addActor,
  },
  editActor: {
    type: ActorType,
    description: "Edit an Actor - only for admin or admin-support",
    args: {
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLString },
      picLink: { type: GraphQLString },
      birthDate: { type: GraphQLString },
    },
    resolve: ActorControllers.editActor,
  },
  deleteActor: {
    type: ActorType,
    description: "Edit an Actor - only for admin or admin-support",
    args: {
      id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: ActorControllers.deleteActor,
  },
};
