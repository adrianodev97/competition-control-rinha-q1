import { FastifyReply, FastifyRequest } from "fastify";
import { createClientData, getClientById } from "src/db/clients";
import { IClient, ICreateTransaction } from "src/types/index";


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

export const createTransaction = async (req: FastifyRequest, res: FastifyReply) => {
  try {

    const { client_id, value, type, description } = req.body as Omit<ICreateTransaction, 'id' | 'created_at'>;

    const clientResponse = await getClientById(client_id)

    if(!clientResponse) {
      return res.status(404).send({ message: "Client not found" });
    }

    if(value <= 0) {
      return res.status(400).send({ message: "Value must be greater than 0" });
    }

    if( type !== 'c' && type !== 'd') {
      return res.status(400).send({ message: "Invalid method" });
    }

    if(description.length > 10) {
      return res.status(400).send({ message: "Description must have less than 10 characters" });
    }

    const { limit, balance } = clientResponse

    console.log(limit, balance)
    
    return res.status(200).send({ message: "Transaction created" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

export const getStatement = async (req: FastifyRequest, res: FastifyReply) => {
  return res.status(200).send({ message: "Statement" });
}
