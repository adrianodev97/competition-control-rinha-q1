import { check } from 'k6';
import http from 'k6/http';
import { randomDescription, randomClientId, randromTransactionValue } from '../utils/helpers.js';
import { config } from '../config/config.js';

export default function() {
  const descriptions = randomDescription();
  const clienteId = randomClientId();
  const value = randromTransactionValue();
  const payload = JSON.stringify({ value, type: 'c', descriptions });

  const res = http.post(`${config.baseUrl}/${clienteId}/transactions`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
};
