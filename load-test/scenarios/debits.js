import { check } from 'k6';
import http from 'k6/http';
import { randomDescription, randomClientId, randromTransactionValue } from '../utils/helpers.js';
import { config } from '../config/config.js';

export default function() {
  const description = randomDescription();
  const clientId = randomClientId();
  const value = randromTransactionValue();
  const payload = JSON.stringify({ value, type: 'd', description }); 

  const res = http.post(`${config.baseUrl}/${clientId}/transactions`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status is 200 or 422': (r) => r.status === 200 || r.status === 422,
  });
};
