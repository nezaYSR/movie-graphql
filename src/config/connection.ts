import { createConnection } from "typeorm";

export const ormConnection = async () => {
  let retries = 5;
  while (retries) {
    try {
      const connection = await createConnection();
      await connection.runMigrations();
      console.log("Connected to the database!");
      break;
    } catch (error) {
      console.log(error);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};
