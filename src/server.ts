import { createConnection } from "typeorm";
import { app } from "./app";

import * as dotenv from "dotenv";
dotenv.config();

createConnection()
  .then(async (connection) => {
    await connection.runMigrations();
    console.log("Connected to the database!");
  })
  .catch((error) => console.log("Error connecting to the database: ", error));

app.listen(process.env.PORT, () =>
  console.log(`Server Running on http://localhost:${process.env.PORT}/graphql`)
);
