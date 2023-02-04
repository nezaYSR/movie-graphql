import { GraphQLObjectType } from "graphql";
import { authorMutations } from "../mutations/authorMutations";
import { movieMutations } from "../mutations/movieMutations";
import { authMutations } from "../mutations/authMutations";
import { actorMutations } from "../mutations/actorMutations";
import { userMutations } from "../mutations/userMutations";

export const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    // Only admin or admin-support can register new user
    registerUser: authMutations.registerUser,
    // New user please check inbox
    loginUser: authMutations.userSignin,
    logoutUser: authMutations.userSignout,
    // User Changing password
    changePassword: userMutations.changePassword,
    // Author Mutations only for admin or admin-support
    addAuthor: authorMutations.addAuthor,
    editAuthor: authorMutations.editAuthor,
    deleteAuthor: authorMutations.deleteAuthor,
    // Movie Mutations only for admin or admin-support
    addMovie: movieMutations.addMovie,
    editMovie: movieMutations.editMovie,
    deleteMovie: movieMutations.deleteMovie,
    // Actor Mutations
    addActor: actorMutations.addActor,
    editActor: actorMutations.editActor,
    deleteActor: actorMutations.deleteActor,
  }),
});
