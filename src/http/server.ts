import fastify from "fastify";

const app = fastify()

app.get('/balance', () => {
  return "1000"
})

app.listen({ port: 3000 }).then(() => {
  console.log("Server listening on http://localhost:3000")
})