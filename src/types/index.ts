export interface Token {
  mint: string;
  name: string;
  symbol: string;
  decimals: number;
  isMutable: boolean;
}

export interface CustomLogic {
  name: string;
  description: string;
  code: string;
  type: 'reward' | 'pool' | 'lottery';
}