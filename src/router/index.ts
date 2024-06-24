import { FastifyInstance } from "fastify";
import { createClient, createTransaction, getStatement } from '../controllers/clients.js';

export const clientsRoutes = async (router: FastifyInstance) => {
  router.post('/create', createClient)
  router.post('/:id/transactions', createTransaction)
  router.get('/:id/statement', getStatement)
}
