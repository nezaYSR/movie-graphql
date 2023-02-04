import { getConnection } from "typeorm";
import { Author } from "../entity/Author";
import { InputValidationError } from "../errorHandlers/customErrorHandler";
import { Authentication } from "../middlewares/authentication";

class AuthorControllers {
  static async seeAuthorList() {
    const connection = await getConnection();
    const authorRepository = await connection.getRepository(Author);

    return authorRepository.find();
  }

  static async seeAuthorDetail(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const authorRepository = await connection.getRepository(Author);
    const tokenPayloadFound = await Authentication(null, args, context);

    if (
      tokenPayloadFound.role == "admin" ||
      tokenPayloadFound.role == "admin-support" ||
      tokenPayloadFound.role == "user"
    ) {
      return await authorRepository
        .createQueryBuilder("author")
        .where(`lower(author.name) like lower(:searchWord)`, {
          searchWord: args.name,
        })
        .orWhere(`author.id= :id`, { id: args.id })
        .getOne();
    } else {
      throw new InputValidationError(
        "Please login to see detail page",
        "id",
        403
      );
    }
  }

  static async addAuthor(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const authorRepository = await connection.getRepository(Author);
    const tokenPayloadFound = await Authentication(null, args, context);

    if (
      tokenPayloadFound.role == "admin" ||
      tokenPayloadFound.role == "admin-support"
    ) {
      let newAuthor = authorRepository.create({
        name: args.name,
        picLink: args.picLink,
        birthDate: args.birthDate,
      });

      await newAuthor.save();
      return newAuthor;
    } else {
      throw new InputValidationError("Forbidden", "id", 403);
    }
  }

  static async editAuthor(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const authorRepository = await connection.getRepository(Author);
    const tokenPayloadFound = await Authentication(null, args, context);

    if (
      tokenPayloadFound.role == "admin" ||
      tokenPayloadFound.role == "admin-support"
    ) {
      const authorFound = await authorRepository
        .createQueryBuilder("author")
        .where(`author.id= :id`, {
          id: args.id,
        })
        .getOne();

      if (!authorFound) {
        throw new Error(`Author with id ${args.id} not found`);
      }

      if (!args.newName) {
        throw new Error(`Author must have a name`);
      }

      await authorRepository.update(
        { id: args.id },
        {
          name: args.newName,
          picLink: args.newPicLink,
          birthDate: args.newBirthDate,
        }
      );

      return authorRepository.findOne({ where: { id: args.id } });
    } else {
      throw new InputValidationError("Forbidden", "id", 403);
    }
  }

  static async deleteAuthor(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const authorRepository = await connection.getRepository(Author);
    const tokenPayloadFound = await Authentication(null, args, context);

    if (
      tokenPayloadFound.role == "admin" ||
      tokenPayloadFound.role == "admin-support"
    ) {
      const authorFound = await authorRepository
        .createQueryBuilder("author")
        .where(`author.id= :id`, {
          id: args.id,
        })
        .getOne();

      if (!authorFound) {
        throw new Error(`Author with id ${args.id} not found`);
      }

      await authorRepository.delete({ id: args.id });

      return args.id;
    } else {
      throw new InputValidationError("Forbidden", "id", 403);
    }
  }
}

export default AuthorControllers;
