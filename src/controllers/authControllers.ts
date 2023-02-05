import { getConnection } from "typeorm";
import { adminCredential } from "../../admin";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { InputValidationError } from "../errorHandlers/customErrorHandler";
import { Authentication } from "../middlewares/authentication";
import { DummyInbox } from "../entity/DummyInbox";

class AuthControllers {
  static async signin(_parent: null, args: any, req: Request) {
    const connection = await getConnection();
    const userRepository = await connection.getRepository(User);

    if (args.username == adminCredential.username) {
      const adminPasswordMatched = bcrypt.compareSync(
        args.password,
        adminCredential?.password!
      );

      if (adminPasswordMatched) {
        const user_access_token = jwt.sign(
          {
            id: adminCredential.id,
            username: adminCredential.username,
            role: adminCredential.role,
          },
          process.env?.JWT_PASS!
        );

        req.session = { jwt: user_access_token };

        return adminCredential;
      } else {
        throw new InputValidationError(
          "Username or Password not found",
          "id",
          404
        );
      }
    } else {
      const userFound = await userRepository.findOne({
        where: { username: args.username },
      });
      if (userFound) {
        const passwordMatched = bcrypt.compareSync(
          args.password,
          userFound?.password!
        );

        if (passwordMatched) {
          const user_access_token = jwt.sign(
            {
              id: userFound.id,
              username: userFound.username,
              role: userFound.role,
            },
            process.env?.JWT_PASS!
          );

          req.session = { jwt: user_access_token };

          return userFound;
        } else {
          throw new InputValidationError(
            "Username or Password not found",
            "id",
            404
          );
        }
      } else {
        throw new InputValidationError(
          "Username or Password not found",
          "id",
          404
        );
      }
    }
  }

  static async signout(_parent: null, args: any, req: Request, context: any) {
    req.session = null;
    return null;
  }

  static async registerUser(parent: any, args: any, context: any) {
    const connection = await getConnection();
    const userRepository = await connection.getRepository(User);
    const dummyInboxRepository = await connection.getRepository(DummyInbox);

    const tokenPayloadFound = await Authentication(null, args, context);
    if (tokenPayloadFound.role == "admin") {
      const generatedPassword = uuidv4().replace(/-/g, "");
      const message = `password given:  ${generatedPassword}  , don't forget to change your password`;

      if (args.username == "admin") {
        throw new InputValidationError("Cannot register admin", "id", 403);
      }

      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(generatedPassword, salt);

      const newUser = userRepository.create({
        username: args.username,
        password: hashedPassword,
        role: args.role,
        joinDate: new Date().toISOString().split("T")[0],
      });

      await newUser.save();

      const newInbox = dummyInboxRepository.create({
        userId: newUser.id,
        username: newUser.username,
        message,
      });

      await newInbox.save();

      return newUser;
    } else {
      throw new InputValidationError("Forbidden", "id", 403);
    }
  }
}

export default AuthControllers;
