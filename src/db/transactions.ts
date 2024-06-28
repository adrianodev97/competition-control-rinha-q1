import { ICreateTransaction } from "src/types/index";
import { prisma } from "./prisma.client.js";

export const createTransactionDB = async (data: Omit<ICreateTransaction, 'id' | 'created_at'>) => {
  return prisma.transaction.create({ data });
};

export const getTransactionsByClientId = async (clientId: number) => {
  return prisma.transaction.findMany({
    where: { client_id: clientId },
    orderBy: { created_at: 'desc' },
    take: 10,
  });
}