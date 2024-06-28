import { Transaction } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { getClientById } from "src/db/clients";
import { getTransactionsByClientId } from "src/db/transactions";
import { IClient } from "src/types/index";

export const getStatement = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { id } = req.params as { id: number };

    const clientResponse = await getClientById(Number(id));
    if (!clientResponse) {
      return res.status(404).send({ message: "Client not found" });
    }

    const transactions = await getTransactionsByClientId(Number(id));

    const statement = formatStatement(clientResponse, transactions);

    return res.status(200).send(statement);
  } catch (error) {
    console.error("Error fetching statement:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const formatStatement = (client: IClient, transactions: Transaction[]) => {
  return {
    balance: {
      total: client.balance,
      statement_date: new Date().toISOString(),
      limit: client.limit,
    },
    last_transactions: transactions.map(({ value, type, description, created_at }) => ({
      value,
      type,
      description,
      created_at: created_at.toISOString(),
    })),
  };
}