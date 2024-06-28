import { FastifyReply, FastifyRequest } from "fastify";
import { getClientById, updateClientBalance } from "src/db/clients";
import { createTransactionDB } from "src/db/transactions";
import { transactionBodySchema } from "src/schemas/transactionSchema";
import { ICreateTransaction } from "src/types/index";

export const createTransaction = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const parsedBody = transactionBodySchema.safeParse(req.body)
    if (!parsedBody.success) {
      return res.status(422).send(parsedBody.error.format())
    }

    const { value, type, description } = parsedBody.data as  Omit<ICreateTransaction, 'id' | 'created_at' | 'client_id'>
    const { id } = await req.params as { id: number }

    const clientResponse = await getClientById(Number(id))
    if(!clientResponse) {
      return res.status(404).send({ message: "Client not found" })
    }
    
    const { limit, balance } = clientResponse;
    const newBalance = type === 'c' ? balance + value : balance - value

    if(type === 'd' && Math.abs(newBalance) > limit) {
      return res.status(422).send({ message: "Insufficient funds" })
    }

    const transactionResponse = await createTransactionDB({client_id: Number(id), value, type, description})
    if(!transactionResponse) {
      throw new Error("Error creating transaction")
    }

    const clientUpdateResponse = await updateClientBalance(Number(id), newBalance)
    if(!clientUpdateResponse) {
      throw new Error("Error updating client balance")
    }
    
    return res.status(200).send({ 
      message: `Transaction created! New balance: ${newBalance}`
    })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return res.status(500).send({ message: "Internal server error" })
  }
}