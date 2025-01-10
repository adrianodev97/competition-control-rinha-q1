import debits from '../scenarios/debits.js';
import credits from '../scenarios/credits.js';
import statements from '../scenarios/statements.js';
import concurrentValidations from '../scenarios/concurrentValidations.js';
import customerCriteria from '../scenarios/customerCriteria.js';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users over 2 minutes
    { duration: '5m', target: 100 }, // Stay at 100 users for 5 minutes
    { duration: '2m', target: 0 },   // Ramp down to 0 users
  ],
};

export default function() {
  debits();
  credits();
  statements();
  concurrentValidations();
  customerCriteria();
};
