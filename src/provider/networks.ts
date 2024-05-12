import { ChainId } from "../constants";
import { networkConnectors } from "./networkConnectors";
import BNBLogo from "@/assets/images/wallet/binance-smart-chain.svg";
import EtherLogo from "@/assets/images/tokens/1.png";
import VICLogo from "@/assets/images/tokens/88.webp";
import POLYGONLogo from "@/assets/images/tokens/80001.svg";
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
    icon: BNBLogo,
    tokenType: "ERC20",
    nativeCurrency: {
      name: "SUI Coin",
      symbol: "SUI",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc-mainnet.suiscan.xyz:443",
    ],
    blockExplorer: {
      name: "SuiScan",
      url: "https://suiscan.xyz/",
    },
    baseTokens: ["SUI"],
    secondBlock: 3,
  },
  [ChainId.TESTNET]: {
    name: "SUI Network",
    shortName: "SUI",
    chainId: ChainId.TESTNET,
    chainSymbol: "sui",
    icon: BNBLogo,
    tokenType: "ERC20",
    nativeCurrency: {
      name: "SUI Coin",
      symbol: "SUI",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc-testnet.suiscan.xyz:443",
    ],
    blockExplorer: {
      name: "SuiScan",
      url: "https://suiscan.xyz/testnet/home",
    },
    baseTokens: ["SUI"],
    secondBlock: 3,
  },
  // [ChainId.CHAPEL]: {
  //   name: "BNBTestnet",
  //   chainId: ChainId.CHAPEL,
  //   chainSymbol: "bsc",
  //   icon: BNBLogo,
  //   testnet: true,
  //   tokenType: "BEP20",
  //   nativeCurrency: {
  //     name: "Binance Coin",
  //     symbol: "BNB",
  //     decimals: 18,
  //   },
  //   rpcUrls: [
  //     "https://data-seed-prebsc-1-s2.bnbchain.org:8545",
  //     "https://data-seed-prebsc-2-s1.bnbchain.org:8545",
  //     "https://data-seed-prebsc-2-s2.bnbchain.org:8545",
  //   ],
  //   blockExplorer: {
  //     name: "BscScan (testnet)",
  //     url: "https://testnet.bscscan.com",
  //   },
  //   baseTokens: ["BNB"],
  //   secondBlock: 3,
  // }
};

export const getNetworkConfigs = (
  chainId: string | number = undefined
): NetworkInterface | undefined => {
  const cid = chainId ?? networkConnectors.getCurrentChainId();
  return cid ? NETWORKS_CONFIG[cid] : undefined;
};
