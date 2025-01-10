import { check } from 'k6';
import http from 'k6/http';
import { config } from '../config/config';

export default function() {
  const payload = JSON.stringify({ value: 1, type: 'd', description: 'validacao' });

  const res = http.post(`${config.baseUrl}/1/transactions`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
};
