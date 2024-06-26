import { CoinMetadata, CoinStruct } from "@mysten/sui/client";
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
  x2 = 0,
  x10 = 1,
  x100 = 2,
}

export interface ArenaCardProps {
  arenaPool: ArenaPoolDataBackend;
  coins?: CoinStruct[];
  balanceMetadata?: CoinMetadata;
  arenaData: Arena;
}

export interface ArenaModalProps {
  arenaData: Arena;
  arenaPool: ArenaPoolDataBackend;
  coins?: CoinStruct[];
  balanceMetadata?: CoinMetadata;
  amount: string;
  costInUsd: number;
}

export interface InfoProps {
  title: string;
  desc?: string[];
}

export interface Arena {
  id: string;
  arenaId: string;
  token: string;
  poolType: 1;
  activePools?: ActivePool[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArenaConfig {
  arenaName?: string;
  pools: {
    maxUsers: number;
    costInUsd: number;
    poolIndex: number;
  }[];
}

export interface ActivePool {
  id: string;
  poolId: string;
  poolIndex: number;
  poolType: number;
  arenaId: string;
  maxUsers: number;
  numUsers: number;
  users: string[];
  costInUsd: number;
  raisedAmount: number;
  expiredAt: number;
  createdBy: string;
  isActive: true;
  winner: string;
  winnerAmount: number;
  isClaimed: false;
  claimedAmount: number;
  createdAt: string;
  updatedAt: string;
}
