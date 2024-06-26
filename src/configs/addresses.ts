import { ChainId } from "@/constants";
import { logClient } from "@/utils";

export const MAINNET_CONTRACTS = {
  POOL: '0x06a82fc6942f222c6f1e77f4c1381d5a077d36baa016fb26bc8c3c4b05167713',
  POOL_CFG_ID: '0x6a2f17b615804b129fc814a774f3e97126853c03748871f76adf9a04ced512cb'
};

export const TESTNET_CONTRACTS = {
  POOL: '0x06a82fc6942f222c6f1e77f4c1381d5a077d36baa016fb26bc8c3c4b05167713',
  POOL_CFG_ID: '0x6a2f17b615804b129fc814a774f3e97126853c03748871f76adf9a04ced512cb'
};

export const CONTRACTS: { [chainId in ChainId]?: any } = {
  [ChainId.MAINNET]: MAINNET_CONTRACTS,
  [ChainId.TESTNET]: TESTNET_CONTRACTS,
  [ChainId.DEVNET]: {},
};

logClient("process.env.NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);

