import { PoolType, ArenaConfig } from "@/utils/types";

export enum ChainId {
  MAINNET = "sui:mainnet",
  TESTNET = "sui:testnet",
  DEVNET = "sui:devnet",
}

export const PAGE_SIZE = {
  HOME: 9,
};

export const PERCENT_DISTRIBUTION = {
  RECEIPT: 90,
  PLATFORM_FEE: 10,
};

export const HISTORY_TYPE = {
  DEPOSIT: "DEPOSIT",
  CLAIM: "CLAIM",
};
export const HISTORY_STATUS = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
};

export const HISTORY_STATUS_COLOR = {
  SUCCESS: "#21c186",
  FAILED: "#e10000",
  PENDING: "#feb42d",
  PROCESSING: "#feb42d",
};


export const ARENA_CONFIG: Record<PoolType, ArenaConfig> = {
  [PoolType.x2]: {
    arenaName: 'X2',
    pools: [
      {poolIndex: 0, maxUsers: 2, costInUsd: 1,},
      {poolIndex: 1, maxUsers: 2, costInUsd: 10},
      {poolIndex: 2, maxUsers: 2, costInUsd: 100}
    ]
  },
  [PoolType.x10]: {
    arenaName: 'X10',
    pools: [
      {poolIndex: 0,maxUsers: 10, costInUsd: 1,},
      {poolIndex: 1,maxUsers: 10, costInUsd: 10},
      {poolIndex: 2,maxUsers: 10, costInUsd: 100}
    ]
  },
  [PoolType.x100]: {
    arenaName: 'X100',
    pools: [
      {poolIndex: 0,maxUsers: 100, costInUsd: 1,},
      {poolIndex: 1,maxUsers: 100, costInUsd: 10},
      {poolIndex: 2,maxUsers: 100, costInUsd: 100}
    ]
  }
};