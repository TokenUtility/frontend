export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  id?: string;
}

export interface ArenaPoolDataBackend {
  id: string;
  cgkId: string;
  symbol: string;
  name: string;
  decimals: 9;
  address?: string;
  ticker?: string;
  createdAt: string;
  updatedAt: string;
  network?: string;
  liquidity?: string;
  marketCap?: string;
  price24hChange?: string;
  price7dChange?: string;
  totalSupply?: string;
  contract?: string;
  price: number;
  overview?: any[];
  backersPartners?: any[];
  officialLinks?: Array<{ url: string; id: string }>;
  socials?: Array<{ url: string; id: string; type: string }>;
}

export enum PoolType {
  x2 = 2,
  x10 = 10,
  x100 = 100,
}
export interface ArenaCardProps {
  type: PoolType;
  arenaPool: ArenaPoolDataBackend;
  isReady: boolean;
}
