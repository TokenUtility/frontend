"use client";
import {
  makeAutoObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";
import { networkConnectors } from "@/provider/networkConnectors";
import RootStore from "@/stores/Root";
import { BigNumber } from "@/utils/bignumber";
import MultiCall from "@/abi/MultiCall.json";
import IPancakePair from "@/abi/IPancakePair.json";
import Token from "@/abi/Token.json";
import { logClient } from "@/utils";
import { ChainId } from "@/constants";
import { toChecksum } from "@/utils/helpers";
import { isAddressEqual, getCookie, setCookie } from "@/utils/helpers";
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

// import snackbarHelper from "@/utils/snackbarHelper";
export interface ChainData {
  currentBlockNumber: number;
}

enum ERRORS {
  UntrackedChainId = "Attempting to access data for untracked chainId",
  ContextNotFound = "Specified context name note stored",
  BlockchainActionNoAccount = "Attempting to do blockchain transaction with no account",
  BlockchainActionNoChainId = "Attempting to do blockchain transaction with no chainId",
  BlockchainActionNoResponse = "No error or response received from blockchain action",
  NoWeb3 = "Error Loading Web3",
}
export enum ContractTypes {
  MultiCall = "MultiCall",
  Token = "Token",
  PancakePair = "PancakePair",
  CampaignFactory = "CampaignFactory",
  CampaignManagement = "CampaignManagement",
  Campaign = "Campaign",
  Reward = "Reward",
  DonateCertificate = "DonateCertificate",
}
// type ChainDataMap = ObservableMap<number, ChainData>;
export const schema = {
  MultiCall: MultiCall.abi,
  Token: Token,
  PancakePair: IPancakePair.abi,
};

export interface TokenMetadata {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  precision?: number;
  isSupported?: boolean;
  allowance?: BigNumber;
  balanceRatio?: BigNumber;
  chainId?: ChainId;
}
export interface ProviderStatus {
  activeChainId: ChainId;
  account: string;
  library: any;
  active: boolean;
  injectedLoaded: boolean;
  injectedActive: boolean;
  injectedChainId: number;
  injectedWeb3: any;
  backUpLoaded: boolean;
  backUpWeb3: any;
  activeProvider: any;
  error: Error;
}

export default class ProviderStore {
  chainData: ChainData;
  providerStatus: ProviderStatus;
  countFetchUserBlockchainData: number;
  initializedProvider: boolean;
  navigator: any;
  estimatedBlocksPerDay: number;
  rootStore: RootStore;

  constructor(rootStore: any) {
    makeAutoObservable(this, {
      rootStore: observable,
      chainData: observable,
      providerStatus: observable,
      initializedProvider: observable,
      countFetchUserBlockchainData: observable,
      estimatedBlocksPerDay: observable,
      isConnect: computed,
      currentBlockNumber: computed,
      getCurrentBlockNumber: computed,
      setCurrentBlockNumber: action,
      updateChainData: action,
      setNavigator: action,
      setAccount: action,
      setActiveChainId: action,
      // sendTransaction: action,
      // sendTransactionWithEstimatedGas: action,
      // handleNetworkChanged: action,
      handleAccountsChanged: action,
      loadProvider: action,
      loadWeb3: action,
      // fetchUserBlockchainData: action,
    });
    this.rootStore = rootStore;
    this.chainData = { currentBlockNumber: -1 } as ChainData;
    this.providerStatus = {} as ProviderStatus;
    this.providerStatus.active = false;
    this.providerStatus.injectedLoaded = false;
    this.providerStatus.injectedActive = false;
    this.providerStatus.backUpLoaded = false;
    this.providerStatus.activeProvider = null;
    this.initializedProvider = false;
    this.countFetchUserBlockchainData = 0;
    this.estimatedBlocksPerDay = 6500;
  }

  get currentBlockNumber(): number {
    return this.chainData.currentBlockNumber;
  }
  get isConnect(): boolean {
    return !!this.providerStatus.account;
  }

  get activeChainId(): string {
    return this.providerStatus.activeChainId;
  }

  get getCurrentBlockNumber(): number {
    return this.chainData.currentBlockNumber;
  }

  setCurrentBlockNumber(blockNumber: any): void {
    this.chainData.currentBlockNumber = blockNumber;
  }
  updateChainData = (data: { currentBlockNumber?: number }) => {
    this.chainData = Object.assign({}, this.chainData, data);
  };

  setNavigator(v: any) {
    this.navigator = v;
  }
  setAccount(account: string): void {
    const { userStore } = this.rootStore;
    const changedAccount = !isAddressEqual(
      account,
      this.providerStatus.account
    );
    this.providerStatus.account = account;
    if (changedAccount && account) {
      // const { handleLoginWallet } = userStore;
      // handleLoginWallet()
      console.log({changedAccount, account})
    }
  }

  setActiveChainId = (chainId: any): void => {
    // const { blockchainFetchStore, transactionStore } = this.rootStore;
    networkConnectors.setCurrentChainId(chainId);
    this.providerStatus.activeChainId = chainId
    const changedNetwork = chainId !== this.providerStatus.activeChainId;
    if (changedNetwork && this.providerStatus.account) {
      // blockchainFetchStore.blockchainFetch(false);
      // transactionStore.loadTxRecords();
      // TODO: load subgraph
    }
  };

  // sendTransaction = async (
  //   contractType: ContractTypes,
  //   contractAddress: string,
  //   action: string,
  //   params: any[],
  //   _overrides?: any,
  //   summary?: string
  // ): Promise<ActionResponse> => {
  //   const { activeChainId: chainId, account } = this.providerStatus;
  //   const { transactionStore } = this.rootStore;
  //   const overrides = _overrides || {};

  //   if (!account) {
  //     throw new Error(ERRORS.BlockchainActionNoAccount);
  //   }

  //   if (!chainId) {
  //     throw new Error(ERRORS.BlockchainActionNoChainId);
  //   }
  //   logClient("abi-" + contractType, this.getContractAbiByType(contractType));
  //   const contract = this.getContract(contractType, contractAddress, account);

  //   // if (!overrides.gasLimit) {
  //   //   const gasEstimate = await this.estimateSafeGas(
  //   //     contractType,
  //   //     contractAddress,
  //   //     action,
  //   //     params,
  //   //     overrides
  //   //   );
  //   //   if (gasEstimate?.gas) {
  //   //     overrides.gasLimit = gasEstimate?.gas;
  //   //   }
  //   // }

  //   const response = await sendAction({
  //     contract,
  //     action,
  //     sender: account,
  //     data: params,
  //     overrides,
  //   });

  //   const { error, txResponse } = response;

  //   if (error) {
  //     console.warn("[Send Transaction Error", error);
  //     if (error?.code !== 4001) {
  //       console.debug(
  //         "[@debug sendAction]",
  //         JSON.stringify({
  //           method: action,
  //           address: contractAddress,
  //           sender: account,
  //           args: params,
  //           overrides: {
  //             value: overrides?.value?.toString(),
  //             gasLimit: overrides?.gasLimit?.toString(),
  //           },
  //           error: error?.message,
  //         })
  //       );
  //     }
  //     // Sentry.captureException(error?.message);
  //   } else if (txResponse) {
  //     // snackbarHelper.toast({ content: summary, txHash: txResponse?.hash });
  //     transactionStore.addTransactionRecord(account, txResponse, summary);
  //   } else {
  //     throw new Error(ERRORS.BlockchainActionNoResponse);
  //   }

  //   return response;
  // };

  // sendTransactionWithEstimatedGas = async (
  //   contractType: ContractTypes,
  //   contractAddress: string,
  //   action: string,
  //   params: any[],
  //   overrides?: any,
  //   summary?: string
  // ): Promise<ActionResponse> => {
  //   const safeGasEstimate: {
  //     gas?: EtherBigNumber;
  //     error?: Error;
  //   } = await this.estimateSafeGas(
  //     contractType,
  //     contractAddress,
  //     action,
  //     params,
  //     overrides
  //   );

  //   if (!EtherBigNumber.isBigNumber(safeGasEstimate?.gas)) {
  //     let errorMessage: string = "This transaction would fail.";
  //     if (safeGasEstimate?.error) {
  //       errorMessage = safeGasEstimate.error?.message;
  //     }
  //     console.error(errorMessage);
  //     return { error: new Error(errorMessage) } as ActionResponse;
  //   } else {
  //     overrides.gasLimit = safeGasEstimate.gas;

  //     try {
  //       return this.sendTransaction(
  //         contractType,
  //         contractAddress,
  //         action,
  //         params,
  //         overrides,
  //         summary
  //       );
  //     } catch (e) {
  //       if (!e || isTxReverted(e)) {
  //         return e as unknown as Promise<ActionResponse>;
  //       }
  //       return {
  //         error: new Error("Oops, something went wrong"),
  //       } as ActionResponse;
  //     }
  //   }
  // };

  // handleNetworkChanged = async (networkId: string | number): Promise<void> => {
  //   const { userStore, notificationStore } = this.rootStore;

  //   logClient(
  //     `[Provider] Network change: ${networkId} ${this.providerStatus.active}`
  //   );
  //   // network change could mean switching from injected to backup or vice-versa
  //   if (this.providerStatus.active) {
  //     if(window && window.coin98) {
  //       setTimeout(async() => {
  //         await this.loadWeb3();
  //       }, 500)
  //     } else {
  //       await this.loadWeb3();
  //     }
  //     const { blockchainFetchStore } = this.rootStore;
  //     blockchainFetchStore.blockchainFetch(true);
  //   }

  //   //
  //   if (userStore.accessToken) {
  //     userStore.handleLogout();
  //     notificationStore.showErrorNotification(
  //       "You have changed chain, please login again"
  //     );
  //   }
  // };


  handleAccountsChanged = (params: { account: { address: string } }): void => {
    const account = params.account.address;
    const { userStore, notificationStore } = this.rootStore;
    logClient(`[Provider] Accounts changed`);
    console.log({params})
    if (!account) {
      this.setAccount("");
    } else {
      const { blockchainFetchStore } = this.rootStore;
      this.setAccount(account);
      // blockchainFetchStore.blockchainFetch(true);
    }
    if (userStore?.profile?.address) {
      userStore.handleLogout();
      notificationStore.showErrorNotification(
        "You have changed account, please login again",
      );
    }
  };

  loadProvider = async (provider: any) => {
    try {
      console.log({ provider });
      if (provider.on) {
        logClient(`[Provider] Subscribing Listeners`);
        provider.on("chainChange", () => {console.log('chainChange')}); // For now assume network/chain ids are same thing as only rare case when they don't match
        provider.on("accountChange", this.handleAccountsChanged);
      }

      runInAction(() => {
        this.providerStatus.injectedLoaded = true;
        this.providerStatus.active = true;
        this.providerStatus.injectedChainId = provider.chain.id;
        this.providerStatus.activeProvider = provider;
        this.setAccount(provider.address);
      });

      logClient(`[Provider] Injected provider loaded.`);
    } catch (err) {
      console.error(`[Provider] Injected Error`, err);
      runInAction(() => {
        this.providerStatus.injectedLoaded = false;
        this.providerStatus.injectedChainId = -1;
        this.setAccount("");
        this.providerStatus.active = false;
        this.providerStatus.activeProvider = null;
      });
    }
  };

  async loadWeb3(wallet) {
    const { connected, chain } = wallet;

    if (connected) {
      logClient(`[Provider] Loading Injected Provider`);
      await this.loadProvider(wallet);
    }

    // If no injected provider or inject provider is wrong chain fall back to Infura
    if (connected && networkConnectors.isChainIdSupported(chain.id)) {
      logClient(`[Provider] Injected provider active.`);
      runInAction(() => {
        this.setActiveChainId(wallet.chain.id);
        this.providerStatus.injectedActive = true;
      });
    } else {
      logClient(`[Provider] BackUp Provider Loaded & Active`);
      runInAction(() => {
        this.setAccount("");
        this.setActiveChainId(wallet?.chain?.id);
        this.providerStatus.injectedActive = true;
        //
        this.providerStatus.activeProvider = 'backup';
        this.providerStatus.injectedActive = false
        this.providerStatus.injectedLoaded = false
        const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });
        console.log({a: suiClient, b: getFullnodeUrl('devnet')})
      });
    }
    runInAction(() => {
      this.providerStatus.active = true;
      this.initializedProvider = true;
    });

    logClient(`[Provider] Provider Active.`, this.providerStatus);
  }

  getContractAbiByType = (type: ContractTypes) => {
    return schema[type];
  };

  getContractMetaData = () => {
    // const contracts = networkConnectors.getContracts(
    //   this.providerStatus.activeChainId
    // );
    const multiCall = networkConnectors
      .getMultiAddress
      // this.providerStatus.activeChainId
      ();
    const { tokens: _tokens } = networkConnectors.getAssets();
    const tokens = { ...(_tokens || {}) };

    const contractMetadata = {
      tokens: [] as TokenMetadata[],
      multiCallContract: multiCall,
    };
    const tokensObjId: { [address: string]: 1 } = {};

    Object.keys(tokens).forEach((tokenAddress) => {
      const token = tokens[tokenAddress];
      const { address, symbol, name, precision } = token;
      if (tokensObjId[tokenAddress?.toLowerCase()]) {
        return;
      }
      tokensObjId[tokenAddress?.toLowerCase()] = 1;
      contractMetadata.tokens.push({
        address: toChecksum(address),
        symbol,
        name,
        decimals: token.decimals || 18,
        precision,
        isSupported: true,
        allowance: new BigNumber(0),
      });
    });
    return contractMetadata;
  };

  // fetchUserBlockchainData = async (account: string) => {
  //   const { tokenStore, transactionStore } = this.rootStore;

  //   console.debug("[Provider] fetchUserBlockchainData", {
  //     account,
  //   });
  //   transactionStore.checkPendingTransactions(account);
  //   await tokenStore.fetchBalancerTokenData(
  //     account,
  //     tokenStore.getTrackedTokenAddresses
  //   );

  //   // await tokenStore.fetchBalancerTokenERC721Data(
  //   //   account,
  //   //   tokenStore.getTrackedToken721Addresses()
  //   // );
  //   runInAction(() => {
  //     this.countFetchUserBlockchainData = this.countFetchUserBlockchainData + 1;
  //   });
  // };
}
