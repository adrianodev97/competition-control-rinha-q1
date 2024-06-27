import { FastifyReply, FastifyRequest } from "fastify";
import { createClientData } from "src/db/clients";
import { IClient } from "src/types/index";

export const createClient = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { id } = req.body as IClient;
    let { limit, balance } = req.body as IClient;

    if(!limit) {
      limit = 0
    }

    if(!balance) {
      balance = 0
    }

    if (!id) {
      return res.status(400).send("Id is required")
    }

    createClientData({ id, limit, balance })
    return res.status(200).send({ message: "Client created" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}