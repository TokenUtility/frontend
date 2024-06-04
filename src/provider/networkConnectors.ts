import { CONTRACTS } from "../configs/addresses";
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
    console.log({currentChainId: this.currentChainId})
    return this.currentChainId;
  }

  public setCurrentChainId(value: string): void {
    this.currentChainId = value;
  }

  public toValidChainId(chainId?: string): string {
    return chainId ? chainId : this.currentChainId;
  }

  public isChainIdSupported(chainId?: string): boolean {
    return supportedChains.indexOf(chainId as ChainId) >= 0;
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

  public getContracts(chainId?: ChainId) {
    return CONTRACTS[this.toValidChainId(chainId)] || {};
  }

  public getSubgraphUrl(chainId?: ChainId): string {
    return SUBGRAPH_URLS[this.toValidChainId(chainId)];
  }

  public getIndexAlgolia(chainId?: ChainId): string {
    return SEARCH_INDEX[this.toValidChainId(chainId)];
  }

}

export const networkConnectors = new NetworkConnectorsClass();
