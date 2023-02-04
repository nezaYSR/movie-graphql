import { getConnection } from "typeorm";
import { Author } from "../entity/Author";
import { Movie } from "../entity/Movie";
import { MovieToActor } from "../entity/MovieToActor";
import { InputValidationError } from "../errorHandlers/customErrorHandler";
import { Authentication } from "../middlewares/authentication";

class MovieControllers {
  static async addMovie(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const movieRepository = await connection.getRepository(Movie);
    const authorRepository = await connection.getRepository(Author);
    const movieToActorRepository = await connection.getRepository(MovieToActor);

    const tokenPayloadFound = await Authentication(null, args, context);

    if (
      tokenPayloadFound.role == "admin" ||
      tokenPayloadFound.role == "admin-support"
    ) {
      let authorFound = await authorRepository.findOne({
        where: { id: args.author_id },
      });

      let newMovie = movieRepository.create({
        title: args.title,
        picLink: args.picLink,
        releaseDate: args.releaseDate,
      });
      newMovie.author = authorFound!;

      await newMovie.save();

      args.actorIdList.forEach(async (actorId: number) => {
        const newIntermedieryTable = movieToActorRepository.create({
          movieId: newMovie.id,
          actorId,
        });

        await movieToActorRepository.save(newIntermedieryTable);
      });

      return newMovie;
    } else {
      throw new InputValidationError("Forbidden", "id", 403);
    }
  }

  static async editMovie(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const movieRepository = await connection.getRepository(Movie);
    const tokenPayloadFound = await Authentication(null, args, context);

    if (
      tokenPayloadFound.role == "admin" ||
      tokenPayloadFound.role == "admin-support"
    ) {
      await movieRepository.update(
        { id: args.id },
        {
          title: args.title,
          picLink: args.picLink,
          releaseDate: args.releaseDate,
        }
      );

      return await movieRepository.findOne({ where: { id: args.id } });
    } else {
      throw new InputValidationError("Forbidden", "id", 403);
    }
  }

  static async deleteMovie(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const movieRepository = await connection.getRepository(Movie);
    const tokenPayloadFound = await Authentication(null, args, context);

    if (
      tokenPayloadFound.role == "admin" ||
      tokenPayloadFound.role == "admin-support"
    ) {
      const movieFound = await movieRepository
        .createQueryBuilder("movie")
        .where(`movie.id= :id`, {
          id: args.id,
        })
        .getOne();

      if (!movieFound) {
        throw new Error(`Movie with id ${args.id} not found`);
      }

      await movieRepository.delete({ id: args.id });

      return null;
    } else {
      throw new InputValidationError("Forbidden", "id", 403);
    }
  }

  static async seeMovieList() {
    const connection = await getConnection();
    const movieRepository = await connection.getRepository(Movie);

    return movieRepository.find();
  }

  static async seeMovieDetail(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const movieRepository = await connection.getRepository(Movie);

    const tokenPayloadFound = await Authentication(null, args, context);

    if (
      tokenPayloadFound.role == "admin" ||
      tokenPayloadFound.role == "admin-support" ||
      tokenPayloadFound.role == "user"
    ) {
      return await movieRepository
        .createQueryBuilder("movie")
        .where(`lower(movie.title) like lower(:searchWord)`, {
          searchWord: args.title,
        })
        .orWhere(`movie.releaseDate= :releaseDate`, {
          releaseDate: args.releaseDate,
        })
        .orWhere(`movie.id= :id`, { id: args.id })
        .getOne();
    }
  }
}

export default MovieControllers;
