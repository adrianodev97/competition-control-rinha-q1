import { FastifyInstance } from "fastify";
import { getStatement } from "src/controllers/statement";
import { createTransaction } from "src/controllers/transactions";
import { createClient } from '../controllers/clients.js';

export const clientsRoutes = async (router: FastifyInstance) => {
  router.post('/create', createClient)
  router.post('/:id/transactions', createTransaction)
  router.get('/:id/statement', getStatement)
}
