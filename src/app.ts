import express from "express";
import cors from "cors";
import routes from "./routes";
import "reflect-metadata";
import cookieSession from "cookie-session";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cookieSession({
    name: "session",
    signed: false,
  })
);

app.use(cors());

app.use(routes);

app.get("/graphql", (req, res) => {
  res.status(201).send(
    `
      Hello this is Movie GraphQL made by Neza Yasser, please login first, admin (username:"admin", password:"admin") \n
       <button style="background-color: blue;"><a href="/graphiql" target="_blank" style="color: white;">  Go to Graphiql </a></button> or 
       <button style="background-color: green;"><a href="nezaysr.tech" target="_blank" style="color: white;">  Go to nezaysr.tech </a></button>
       `
  );
});

export { app };
