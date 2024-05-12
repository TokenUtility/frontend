import { CONTRACTS } from "@/configs/addresses";
import { ChainId } from "@/constants";

export interface TokenInfo {
  address: string;
  name?: string;
  symbol: string;
  decimals: number;
  image?: string;
}

export interface ProtocolToken {
  [symbol: string]: TokenInfo;
}

const protocolTokenByChainID  = (chainID: ChainId) => {
  return {
    USDT: {
      address: CONTRACTS[chainID].USDTTokenContract,
      name: "USDT",
      symbol: "USDT",
      decimals: 18,
      image: "/images/wallet/usdt.svg",
    },
  }
}

export const PROTOCOL_TOKENS: { [chainId in ChainId]?: ProtocolToken } = {
  [ChainId.TESTNET]: protocolTokenByChainID(ChainId.TESTNET),
  [ChainId.MAINNET]: protocolTokenByChainID(ChainId.MAINNET),
};

export const WHITELISTED_TOKENS: {
  [chainId in ChainId]?: { tokens: any; untrusted: string[] };
} = {
  [ChainId.MAINNET]: require("./registry.homestead.json"),
  [ChainId.TESTNET]: require("./registry.chapel.json"),
};
