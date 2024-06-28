import fastify from "fastify";
import { clientsRoutes } from "./router/index.js";

const app = fastify();

app.register(clientsRoutes, { prefix: "/clients" })

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log("Server listening on http://localhost:3333");
}).catch((error) => {
  console.error(error);
});
