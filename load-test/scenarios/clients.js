import { check } from 'k6';
import http from 'k6/http';
import { config } from '../config/config';

export default function() {
  const res = http.get( `${config.baseUrl}/1/statement`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
};
