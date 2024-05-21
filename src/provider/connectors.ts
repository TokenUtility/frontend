"use client";
import { ChainId } from "../constants";
import { NetworkConnector } from "./NetworkConnector";

export const RPC_URLS: { [chainId: string]: string } = {
  [ChainId.MAINNET]: (process.env.NEXT_PUBLIC_RPC_URL_MAINNET || 'https://rpc.mainnet.sui.io/' ) as string,
  [ChainId.DEVNET]: (process.env.NEXT_PUBLIC_RPC_URL_DEVNET || 'https://fullnode.devnet.sui.io/' ) as string,
  [ChainId.TESTNET]: (process.env.NEXT_PUBLIC_RPC_URL_TESTNET || 'https://fullnode.testnet.sui.io/' ) as string
};

export const API_URLS: { [chainId: string]: string } = {
  [ChainId.MAINNET]: process.env.NEXT_PUBLIC_API_URL_MAINNET as string,
  [ChainId.DEVNET]: process.env.NEXT_PUBLIC_API_URL_DEVNET as string,
  [ChainId.TESTNET]: process.env.NEXT_PUBLIC_API_URL_TESTNET as string
};

export const SUBGRAPH_URLS: { [chainId: string]: string } = {
  [ChainId.MAINNET]: process.env.NEXT_PUBLIC_SUBGRAPH_URL_MAINNET as string,
  [ChainId.DEVNET]: process.env.NEXT_PUBLIC_SUBGRAPH_URL_MAINNET as string,
};

export const SEARCH_INDEX: { [chainId: string]: string } = {
  [ChainId.MAINNET]: "",
  [ChainId.DEVNET]: "",
  [ChainId.TESTNET]: ""
};

// tslint:disable-next-line: radix
export const NETWORK_CHAIN_ID: number = parseInt(
  process.env.NEXT_PUBLIC_SUPPORTED_NETWORK_ID ?? "sui:mainnet"
);

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: RPC_URLS[ChainId.MAINNET] },
});

export const SUPPORTED_CHAINS = [
  ChainId.MAINNET,
  ChainId.TESTNET,
  ChainId.DEVNET
];

export const chainNameById = {
  [ChainId.MAINNET.toString()]: "SUI mainnet",
  [ChainId.TESTNET.toString()]: "SUI testnet",
  [ChainId.DEVNET.toString()]: "SUI devnet",
};
