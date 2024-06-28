import { FastifyReply, FastifyRequest } from "fastify";
import { createClientData } from "src/db/clients";
import { clientBodySchema } from "src/schemas/clientSchema";

export const createClient = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const parsedBody = clientBodySchema.safeParse(req.body)
    if (!parsedBody.success) {
      return res.status(422).send({
        message: "Validation error",
        errors: parsedBody.error.format(),
      })
    }

    const { id, limit = 0, balance = 0 } = parsedBody.data

    const newClient = await createClientData({ id, limit, balance })

    return res.status(201).send({ message: "Client created", client: newClient })
  } catch (error) {
   console.error("Error creating client:", error)
    return res.status(500).send({ message: "Internal server error" })
  }
}