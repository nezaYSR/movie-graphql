import express from "express";
import cors from "cors";
import routes from "./routes";
import "reflect-metadata";
import cookieSession from "cookie-session";
import path from "path";

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
  res.sendFile(path.join(__dirname + "/render/" + "/index.html"));
});

app.get("/howto", (req, res) => {
  res.sendFile(path.join(__dirname + "/render/" + "/how_to.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname + "/render/" + "/about.html"));
});

export { app };
