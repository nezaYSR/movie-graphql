import { createConnection } from "typeorm";

export const createTestConn = async () =>
  createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "testing-db",
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: ["src/entity/**/*"],
  });
