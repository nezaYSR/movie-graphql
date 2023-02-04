import Router from "express";
import { graphqlHTTP } from "express-graphql";
import { schemas } from "../schema/index";

const router = Router();

router.use(
  "/graphiql",
  graphqlHTTP({
    schema: schemas,
    graphiql: true,
  })
);

export default router;
