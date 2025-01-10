import { check } from 'k6';
import http from 'k6/http';
import { randomClientId } from '../utils/helpers.js';
import { config } from '../config/config.js';

export default function() {
  const clientId = randomClientId();
  const res = http.get(`${config.baseUrl}/${clientId}/statement`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
};
