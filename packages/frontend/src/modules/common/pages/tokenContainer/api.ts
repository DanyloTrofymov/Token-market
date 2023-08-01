import { Token } from '../../types';

export async function fetchTokens(): Promise<Token[]> {
  return [
    { id: 1, name: 'Token A', symbol: 'TKA', balance: 100 },
    { id: 2, name: 'Token B', symbol: 'TKB', balance: 200 },
    { id: 3, name: 'Token C', symbol: 'TKC', balance: 300 }
  ];
}
