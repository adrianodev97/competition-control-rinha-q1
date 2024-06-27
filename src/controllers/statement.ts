import { FastifyReply, FastifyRequest } from "fastify";
import { getClientById } from "src/db/clients";
import { gestTransactionsByClientId } from "src/db/transactions";

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