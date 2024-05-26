import { ChainId } from "@/constants";
import { logClient } from "@/utils";

export const MAINNET_CONTRACTS = {};

export const TESTNET_CONTRACTS = {};

export const CONTRACTS: { [chainId in ChainId]?: any } = {
  [ChainId.MAINNET]: MAINNET_CONTRACTS,
  [ChainId.TESTNET]: TESTNET_CONTRACTS,
};

logClient("process.env.NEXT_PUBLIC_ENV", process.env.NEXT_PUBLIC_ENV);

export const MULTICALL_ADDRESSES: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: "",
  [ChainId.TESTNET]: "",
};
