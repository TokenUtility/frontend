import { CONTRACTS, MULTICALL_ADDRESSES } from "../configs/addresses";
import {
  PROTOCOL_TOKENS,
  ProtocolToken,
  WHITELISTED_TOKENS,
} from "@/configs/tokens";
import { ChainId } from "@/constants";
import { chainNameById } from "@/provider/connectors";
import {
  API_URLS,
  API_CMS_URLS,
  RPC_URLS,
  SUPPORTED_CHAINS,
  SUBGRAPH_URLS,
  SEARCH_INDEX,
} from "./connectors";

const supportedChains = SUPPORTED_CHAINS;
const defaultChainId = String(
  process.env.NEXT_PUBLIC_SUPPORTED_NETWORK_ID || supportedChains[0],
);

class NetworkConnectorsClass {
  public currentChainId: string;

  constructor() {
    this.currentChainId = defaultChainId;
  }

  public getDefaultChainId(): string {
    return defaultChainId;
  }

  public getCurrentChainId(): string {
    return this.currentChainId;
  }

  public setCurrentChainId(value: string): void {
    this.currentChainId = value;
  }
  public toValidChainId(chainId?: ChainId): string {
    return chainId ? chainId : this.currentChainId;
  }

  public isChainIdSupported(chainId?: ChainId): boolean {
    return supportedChains.indexOf(chainId) >= 0;
  }

  // tslint:disable-next-line: no-unnecessary-initializer
  public getSupportedChainName(chainId = undefined): string {
    return chainNameById[chainId ?? this.currentChainId];
  }

  public getBackupUrl(chainId?: ChainId): string {
    return RPC_URLS[this.toValidChainId(chainId)];
  }

  public getAPIUrl(chainId?: ChainId): string {
    console.log({toValidChainId: this.toValidChainId(chainId), chainId})
    return API_URLS[this.toValidChainId(chainId)] || "";
  }

  public getAPICmsUrl(chainId?: ChainId): string {
    return API_CMS_URLS[this.toValidChainId(chainId)] || "";
  }

  public getMultiAddress(chainId?: ChainId): string {
    return MULTICALL_ADDRESSES[this.toValidChainId(chainId)] || "";
  }

  public getContracts(chainId?: ChainId) {
    return CONTRACTS[this.toValidChainId(chainId)] || {};
  }

  public getSubgraphUrl(chainId?: ChainId): string {
    return SUBGRAPH_URLS[this.toValidChainId(chainId)];
  }

  public getIndexAlgolia(chainId?: ChainId): string {
    return SEARCH_INDEX[this.toValidChainId(chainId)];
  }

  public getMainToken() {
    const isValid =
      this.currentChainId &&
      PROTOCOL_TOKENS &&
      PROTOCOL_TOKENS[this.currentChainId] &&
      Object.keys(PROTOCOL_TOKENS[this.currentChainId]).length > 0;
    if (!isValid) {
      return {};
    }

    const tokens = PROTOCOL_TOKENS[this.currentChainId];
    return tokens.USDT;
  }

  public getProtocolTokens(chainId?: ChainId): ProtocolToken {
    return (
      PROTOCOL_TOKENS[this.toValidChainId(chainId)] || ({} as ProtocolToken)
    );
  }

  public getAssets() {
    const { tokens = {}, untrusted = [] } =
      (this.currentChainId && WHITELISTED_TOKENS[this.currentChainId]) ||
      ({} as any);
    return { tokens, untrusted };
  }
}

export const networkConnectors = new NetworkConnectorsClass();
