//*******************************************************//
//*Do not delete the comment -- they are code for deploy*//
//*******************************************************//
"use strict";
import * as cfg from "./config.js";
import Fastify from "fastify";
import mercurius from "mercurius";
import { schema } from "./schema.js";
import { resolvers } from "./resolvers.js";
//comment out this for server test
import cors from "@fastify/cors";

// import path from "path";
// import FastifyStatic from "@fastify/static";
// import { fileURLToPath } from "url";

const app = Fastify();

// // additions for handling static file
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.register(FastifyStatic, {
//   root: path.join(__dirname, "public"),
//   prefix: "/",
// });
// app.get("/", (req, reply) => reply.sendFile("index.html"));
// // if user refreshes page
// app.setNotFoundHandler((req, res) => {
//   res.sendFile("index.html");
// });

//comment out this for server test
app.register(cors, {});

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true, // web page for to test queries
});
app.listen({ port: cfg.port });
