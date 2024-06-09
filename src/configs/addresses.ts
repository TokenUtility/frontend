import { ChainId } from "@/constants";
import { logClient } from "@/utils";

export const MAINNET_CONTRACTS = {
  POOL: '0x34f19d4c7ca0b898204bb6ae9de8433c9f8e587432931b3bbc6bcd78f2bf07a2'
};

export const TESTNET_CONTRACTS = {
  POOL: '0x34f19d4c7ca0b898204bb6ae9de8433c9f8e587432931b3bbc6bcd78f2bf07a2'
};

export const CONTRACTS: { [chainId in ChainId]?: any } = {
  [ChainId.MAINNET]: MAINNET_CONTRACTS,
  [ChainId.TESTNET]: TESTNET_CONTRACTS,
  [ChainId.DEVNET]: {},
};

logClient("process.env.NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);

