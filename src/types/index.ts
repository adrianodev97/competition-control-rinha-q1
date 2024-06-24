export interface IClient {
  id: number,
  limit: number,
  balance: number,
}

export interface ICreateTransaction {
  id: string,
  client_id: number,
  value: number,
  type: 'c' | 'd',
  description: string,
  created_at: Date,
}