import { ormConnection } from "./config/connection";
import { app } from "./app";

import * as dotenv from "dotenv";
dotenv.config();

ormConnection();

app.listen(process.env.PORT, () =>
  console.log(`Server Running on http://localhost:${process.env.PORT}/graphql`)
);
