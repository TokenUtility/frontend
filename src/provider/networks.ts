import { ChainId } from "../constants";
import { networkConnectors } from "./networkConnectors";
import SuiLogo from "@/assets/images/wallet/101.svg";
import { StaticImageData } from "next/image";

export interface NetworkInterface {
  name: string;
  shortName?: string;
  chainName?: string;
  chainId: ChainId | number;
  chainSymbol: string;
  testnet?: boolean;
  icon: string | StaticImageData;
  tokenType?: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorer: {
    name: string;
    url: string;
  };
  baseTokens: [string]; // [ETH]
  secondBlock: number;
}

export const NETWORKS_CONFIG: { [chainId in ChainId]?: NetworkInterface } = {
  [ChainId.MAINNET]: {
    name: "SUI Network",
    shortName: "SUI",
    chainId: ChainId.MAINNET,
    chainSymbol: "sui",
    icon: SuiLogo,
    tokenType: "ERC20",
    nativeCurrency: {
      name: "SUI Coin",
      symbol: "SUI",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mainnet.suiscan.xyz:443"],
    blockExplorer: {
      name: "SuiScan",
      url: "https://suiscan.xyz/",
    },
    baseTokens: ["SUI"],
    secondBlock: 10,
  },
  [ChainId.TESTNET]: {
    name: "SUI Network",
    shortName: "SUI",
    chainId: ChainId.TESTNET,
    chainSymbol: "sui",
    icon: SuiLogo,
    tokenType: "ERC20",
    nativeCurrency: {
      name: "SUI Coin",
      symbol: "SUI",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-testnet.suiscan.xyz:443"],
    blockExplorer: {
      name: "SuiScan",
      url: "https://suiscan.xyz/testnet",
    },
    baseTokens: ["SUI"],
    secondBlock: 10,
  },
};

export const getNetworkConfigs = (
  chainId: string | number = undefined,
): NetworkInterface | undefined => {
  const cid = chainId ?? networkConnectors.getCurrentChainId();

  return cid ? NETWORKS_CONFIG[cid] : undefined;
};
