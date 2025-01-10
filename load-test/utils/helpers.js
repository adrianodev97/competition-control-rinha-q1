export function randomDescription() {
  return Math.random().toString(36).substring(2, 12);
}

export function randomClientId() {
  return Math.floor(Math.random() * 5) + 1;
}

export function randromTransactionValue() {
  return Math.floor(Math.random() * 10000) + 1;
}
