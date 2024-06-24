import { IClient, ICreateTransaction } from "../types/index.js";
import { prisma } from "./prisma.client.js";

export const createClientData = async (data: IClient) => {
  return prisma.client.create({ data });
};

export const getClientById = async (clientId: number) => {  
  return prisma.client.findUnique({
    where: { id: clientId },
  });
}

export const createTransaction = async (data: Omit<ICreateTransaction, 'id' | 'created_at'>) => {
  return prisma.transaction.create({ data });
};

export const gestTransactionsByClientId = async (clientId: number) => {
  return prisma.transaction.findMany({
    where: { client_id: clientId},
  });
}