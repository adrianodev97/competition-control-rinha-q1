import { IClient } from "../types/index.js";
import { prisma } from "./prisma.client.js";

export const createClientData = async (data: IClient) => {
  return prisma.client.create({ data });
};

export const getClientById = async (clientId: number) => {  
  return prisma.client.findUnique({
    where: { id: clientId },
  });
}

export const updateClientBalance = async (clientId: number, newBalance: number) => {
  return prisma.client.update({
    where: { id: clientId },
    data: { balance: newBalance },
  });
}