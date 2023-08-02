export interface Token {
  id: number;
  name: string;
  symbol: string;
  balance: number;
}

export interface Create1155 {
  tokenURI: string;
  amount: number;
}
