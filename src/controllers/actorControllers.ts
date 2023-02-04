import { getConnection } from "typeorm";
import { Actor } from "../entity/Actor";
import { InputValidationError } from "../errorHandlers/customErrorHandler";
import { Authentication } from "../middlewares/authentication";

class ActorControllers {
  static async seeActorList() {
    const connection = await getConnection();
    const actorRepository = await connection.getRepository(Actor);

    return actorRepository.find();
  }

  static async seeActorDetail(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const actorRepository = await connection.getRepository(Actor);
    const tokenPayloadFound = await Authentication(null, args, context);

    if (
      tokenPayloadFound.role == "admin" ||
      tokenPayloadFound.role == "admin-support" ||
      tokenPayloadFound.role == "user"
    ) {
      return await actorRepository
        .createQueryBuilder("actor")
        .where(`lower(actor.name) like lower(:searchWord)`, {
          searchWord: args.name,
        })
        .orWhere(`actor.id= :id`, { id: args.id })
        .getOne();
    } else {
      throw new InputValidationError(
        "Please login to see detail page",
        "id",
        403
      );
    }
  }

  static async addActor(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const actorRepository = await connection.getRepository(Actor);
    const tokenPayloadFound = await Authentication(null, args, context);

    if (
      tokenPayloadFound.role == "admin" ||
      tokenPayloadFound.role == "admin-support"
    ) {
      let newActor = actorRepository.create({
        name: args.name,
        picLink: args.picLink,
        birthDate: args.birthDate,
      });

      await newActor.save();
      return newActor;
    } else {
      throw new InputValidationError("Forbidden", "id", 403);
    }
  }

  static async editActor(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const actorRepository = await connection.getRepository(Actor);
    const tokenPayloadFound = await Authentication(null, args, context);

    if (
      tokenPayloadFound.role == "admin" ||
      tokenPayloadFound.role == "admin-support"
    ) {
      await actorRepository.update(
        { id: args.id },
        {
          name: args.name,
          picLink: args.picLink,
          birthDate: args.birthDate,
        }
      );

      return await actorRepository.findOne({ where: { id: args.id } });
    } else {
      throw new InputValidationError("Forbidden", "id", 403);
    }
  }

  static async deleteActor(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const actorRepository = await connection.getRepository(Actor);
    const tokenPayloadFound = await Authentication(null, args, context);

    if (
      tokenPayloadFound.role == "admin" ||
      tokenPayloadFound.role == "admin-support"
    ) {
      const actorFound = await actorRepository
        .createQueryBuilder("actor")
        .where(`actor.id= :id`, {
          id: args.id,
        })
        .getOne();

      if (!actorFound) {
        throw new Error(`Actor with id ${args.id} not found`);
      }

      await actorRepository.delete({ id: args.id });

      return null;
    } else {
      throw new InputValidationError("Forbidden", "id", 403);
    }
  }
}

export default ActorControllers;
