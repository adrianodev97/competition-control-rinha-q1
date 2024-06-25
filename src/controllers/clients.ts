import { FastifyReply, FastifyRequest } from "fastify";
import { createClientData, createTransactionDB, gestTransactionsByClientId, getClientById, updateClientBalance } from "src/db/clients";
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
    const { value, type, description } = req.body as Omit<ICreateTransaction, 'id' | 'created_at' | 'client_id'>;
    const { id } = await req.params as { id: number };

    const clientResponse = await getClientById(Number(id))
    
    if(!clientResponse) {
      return res.status(404).send({ message: "Client not found" });
    }

    if(value <= 0) {
      return res.status(422).send({ message: "Value must be greater than 0" });
    }
    
    if( type !== 'c' && type !== 'd') {
      return res.status(422).send({ message: "Invalid method" });
    }
    
    if(!description) {
      return res.status(422).send({ message: "Description is required" });
    }
    
    if(description.length > 10) {
      return res.status(422).send({ message: "Description must have less than 10 characters" });
    }
    
    const { limit, balance } = clientResponse

    const newBalance = type === 'c' ? balance + value : balance - value

    if(type === 'd' && Math.abs(newBalance) > limit) {
      return res.status(422).send({ message: "Insufficient funds" });
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
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

export const getStatement = async (req: FastifyRequest, res: FastifyReply) => {
  const { id } = await req.params as { id: number };

  const clientResponse = await getClientById(Number(id))
    
  if(!clientResponse) {
    return res.status(404).send({ message: "Client not found" });
  }

  const { limit, balance } = clientResponse

  const transactions = await gestTransactionsByClientId(Number(id))

  const statement = {
    balance: {
      total: balance,
      statement_date: new Date(),
      limite: limit
    },
    ultimas_transacoes: transactions.map(transaction => ({
      value: transaction.value,
      type: transaction.type,
      description: transaction.description,
      created_at: transaction.created_at
    }))
  }

  return res.status(200).send(statement);
}
