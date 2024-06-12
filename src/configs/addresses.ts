import { ChainId } from "@/constants";
import { logClient } from "@/utils";

export const MAINNET_CONTRACTS = {
  POOL: '0x7c14efeca862108334cdb1b20c6ba1f620693c9919032e914daed8ba9a1f80d7'
};

export const TESTNET_CONTRACTS = {
  POOL: '0xaf42cdbb371e4c7a833a9b4fd53e27e5fae6d21377da80e064d1f92efed708f7'
};

export const CONTRACTS: { [chainId in ChainId]?: any } = {
  [ChainId.MAINNET]: MAINNET_CONTRACTS,
  [ChainId.TESTNET]: TESTNET_CONTRACTS,
  [ChainId.DEVNET]: {},
};

logClient("process.env.NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);

