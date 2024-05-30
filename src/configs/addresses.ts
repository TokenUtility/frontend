import { ChainId } from "@/constants";
import { logClient } from "@/utils";

export const MAINNET_CONTRACTS = {
  DEPOSIT: '0x1fd3e7a7ac71377e6e6493be98e1579aa5228b5ad3bbe699230174a25964c1e3'
};

export const TESTNET_CONTRACTS = {
  DEPOSIT: '0x1fd3e7a7ac71377e6e6493be98e1579aa5228b5ad3bbe699230174a25964c1e3'
};

export const CONTRACTS: { [chainId in ChainId]?: any } = {
  [ChainId.MAINNET]: MAINNET_CONTRACTS,
  [ChainId.TESTNET]: TESTNET_CONTRACTS,
  [ChainId.DEVNET]: {},
};

logClient("process.env.NEXT_PUBLIC_ENV", process.env.NEXT_PUBLIC_ENV);

