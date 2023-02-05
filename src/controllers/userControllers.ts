import { getConnection } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "../entity/User";
import { InputValidationError } from "../errorHandlers/customErrorHandler";
import { Authentication } from "../middlewares/authentication";
import { DummyInbox } from "../entity/DummyInbox";

class UserControllers {
  static async changePassword(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const userRepository = await connection.getRepository(User);
    const tokenPayloadFound = await Authentication(null, args, context);

    if (tokenPayloadFound.role != "admin") {
      const userFound = await userRepository.findOne({
        where: { id: tokenPayloadFound.id },
      });
      const userPasswordMatched = bcrypt.compareSync(
        args.password,
        userFound?.password!
      );

      if (userPasswordMatched) {
        // at least 8 characters long with at least 1 number
        const passwordRegex = /^(?=.*\d).{8,}$/;

        const passwordValid = passwordRegex.test(args.newPassword);

        if (passwordValid) {
          const salt = await bcrypt.genSaltSync(10);
          const hashedPassword = await bcrypt.hashSync(args.newPassword, salt);
          await userRepository.update(
            { id: userFound?.id },
            {
              password: hashedPassword,
            }
          );

          return userFound;
        } else {
          throw new InputValidationError(
            "Password must be at least 8 characters long with at least 1 number",
            "id",
            400
          );
        }
      } else {
        throw new InputValidationError(
          "Previous password incorrect",
          "id",
          401
        );
      }
    } else {
      throw new InputValidationError("Admin can't change password", "id", 403);
    }
  }

  static async seeInbox(parent: any, args: any) {
    const connection = await getConnection();
    const userRepository = await connection.getRepository(User);
    const inboxRepository = await connection.getRepository(DummyInbox);

    const userExist = await userRepository.findOne({
      where: { username: args.username },
    });

    if (userExist) {
      const inboxFound = await inboxRepository.find({
        where: { userId: userExist.id },
      });
      return inboxFound;
    } else {
      throw new InputValidationError("Username not found", "id", 400);
    }
  }
}

export default UserControllers;
