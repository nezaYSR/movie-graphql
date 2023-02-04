import type { Connection } from "typeorm";
import { createTestConn } from "./createTestConn";

let conn: Connection;

beforeAll(async () => {
  conn = await createTestConn();
});

afterAll(async () => {
  await conn.close();
});

describe("resolvers", () => {});
