export interface ITransaction {
  id: number;
  userId: number;
  type: string;
  amount: number;
  tag: string;
  description: string;
  note?: string | null;
  date: string;
}
