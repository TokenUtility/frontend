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
// import { isAddressEqual, getCookie, setCookie } from "@/utils/helpers";

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
  activeChainId: string;
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
      // handleClose: action,
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
    // const { userStore } = this.rootStore;
    // const changedAccount = !isAddressEqual(
    //   account,
    //   this.providerStatus.account
    // );
    // if (changedAccount && account) {
    //   const { handleLoginWallet } = userStore;
    // }
    this.providerStatus.account = account;
  }

  setActiveChainId = (chainId: any): void => {
    // const { blockchainFetchStore, transactionStore } = this.rootStore;
    // networkConnectors.setCurrentChainId(chainId);
    // this.providerStatus = Object.assign({}, this.providerStatus, {
    //   activeChainId: chainId,
    // });
    // const changedNetwork = chainId !== this.providerStatus.activeChainId;
    // if (changedNetwork && this.providerStatus.account) {
    //   // blockchainFetchStore.blockchainFetch(false);
    //   // transactionStore.loadTxRecords();
    //   // TODO: load subgraph
    // }
  };

  // account is optional
  // getProviderOrSigner(library: any, account: string) {
  //   console.debug("[getProviderOrSigner", {
  //     library,
  //     account,
  //     signer: library.getSigner(account),
  //   });

  //   return account
  //     ? new UncheckedJsonRpcSigner(library.getSigner(account))
  //     : library;
  // }

  // getSigner() {
  //   return this.getProviderOrSigner(
  //     this.providerStatus.library,
  //     this.providerStatus.account
  //   );
  // }

  // getWeb3Provider(): Web3Provider | undefined {
  //   if (this.providerStatus.activeProvider) {
  //     const web3Provider = new Web3Provider(
  //       this.providerStatus.activeProvider,
  //       "any"
  //     );
  //     web3Provider.pollingInterval = 15000;
  //     return web3Provider;
  //   }
  //   return undefined;
  // }

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

  // handleClose = async (): Promise<void> => {
  //   logClient(`[Provider] HandleClose() ${this.providerStatus.active}`);
  //   if (this.providerStatus.active) {
  //     await this.loadWeb3();
  //   }
  // };

  handleAccountsChanged = (params: { account: {address: string} }): void => {
    const account = params.account.address
    const { userStore, notificationStore } = this.rootStore;
    logClient(`[Provider] Accounts changed`);
    if (!account) {
      this.setAccount('');
    } else {
      const { blockchainFetchStore } = this.rootStore;
      this.setAccount(account);
      // blockchainFetchStore.blockchainFetch(true);
    }
    if (userStore?.profile?.address) {
      userStore.handleLogout();
      notificationStore.showErrorNotification(
        "You have changed account, please login again"
      );
    }
  };

  loadProvider = async (provider: any) => {
    try {
      // remove any old listeners
      // if (
      //   this.providerStatus.activeProvider &&
      //   this.providerStatus.activeProvider.on
      // ) {
      //   logClient(`[Provider] Removing Old Listeners`);
      //   this.providerStatus.activeProvider.removeListener(
      //     "chainChanged",
      //     this.handleNetworkChanged
      //   );
      //   this.providerStatus.activeProvider.removeListener(
      //     "accountsChanged",
      //     this.handleAccountsChanged
      //   );
      //   this.providerStatus.activeProvider.removeListener(
      //     "disconnect",
      //     this.handleClose
      //   );
      //   this.providerStatus.activeProvider.removeListener(
      //     "chainChanged",
      //     this.handleNetworkChanged
      //   );
      // }
      console.log({provider})
      if (provider.on) {
        logClient(`[Provider] Subscribing Listeners`);
        // provider.on("chainChanged", this.handleNetworkChanged); // For now assume network/chain ids are same thing as only rare case when they don't match
        provider.on("accountChange", this.handleAccountsChanged);
        // provider.on("disconnect", this.handleClose);
      }

      runInAction(() => {
        this.providerStatus.injectedLoaded = true;
        this.providerStatus.active = true;
        this.providerStatus.injectedChainId = provider.chain.id
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
    /*
    Handles loading web3 provider.
    Injected web3 loaded and active if chain Id matches.
    Backup web3 loaded and active if no injected or injected chain Id not correct.
    */
   const {connected, chain} = wallet

    // if (connected) {
    //   logClient(`[Provider] Loading Injected Provider`);
    //   await this.loadProvider(wallet);
    // }

    // If no injected provider or inject provider is wrong chain fall back to Infura
    if (
      !connected ||
      !networkConnectors.isChainIdSupported(chain.id)
    ) {
      logClient(
        `[Provider] Reverting To Backup Provider.`,
        this.providerStatus
      );
      try {
        runInAction(() => {
          this.providerStatus.injectedActive = false;
          this.providerStatus.backUpLoaded = true;
          this.setActiveChainId(wallet.chain.id);
          this.setAccount("");
          this.providerStatus.activeProvider = "backup";
        });

        logClient(`[Provider] BackUp Provider Loaded & Active`);
      } catch (err) {
        console.error(`[Provider] loadWeb3 BackUp Error`, err);
        runInAction(() => {
          this.providerStatus.injectedActive = false;
          this.providerStatus.backUpLoaded = false;
          this.setActiveChainId(-1);
          this.setAccount("");
          this.providerStatus.backUpWeb3 = null;
          this.providerStatus.active = true; // false;
          this.providerStatus.error = new Error(ERRORS.NoWeb3);
          this.providerStatus.activeProvider = null;
        });

        return;
      }
    } else {
      logClient(`[Provider] Injected provider active.`);
      console.log({a: wallet.chain.id})
      runInAction(() => {
        this.setActiveChainId(wallet.chain.id);
        this.providerStatus.injectedActive = true;
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

  /**
   * for ethers v4
   */
  // getContract(
  //   type: ContractTypes | any[],
  //   address: string,
  //   signerAccount?: string
  // ): ethers.Contract | undefined {
  //   if (!address) {
  //     return undefined;
  //   }
  //   const { library } = this.providerStatus;
  //   const abi = Array.isArray(type) ? type : schema[type];
  //   if (signerAccount) {
  //     return new ethers.Contract(
  //       address,
  //       abi,
  //       this.getProviderOrSigner(library, signerAccount)
  //     );
  //   }

  //   return new ethers.Contract(address, abi, library);
  // }
  //
  /**
   * for ethers v5
   */
  // getContract(
  //   type: ContractTypes | any[],
  //   address: string,
  //   signerAccount?: string
  // ): EthersProjectContract {
  //   const { web3Provider } = this.providerStatus;
  //   const abi = Array.isArray(type) ? type : schema[type];

  //   const providerOrSigner = signerAccount
  //     ? web3Provider.getSigner(signerAccount).connectUnchecked()
  //     : web3Provider;

  //   return new EthersProjectContract(address, abi, providerOrSigner as any);
  // }

  // estimateSafeGas = (
  //   type: ContractTypes | any[],
  //   contractAddress: string,
  //   method: string,
  //   args: any[],
  //   overrides?: any
  // ): Promise<{ gas?: EtherBigNumber; error?: Error }> | undefined => {
  //   logClient(`[@estimate: ${method}]`, contractAddress, args, overrides);
  //   const { account } = this.providerStatus;
  //   const contract = this.getContract(type, contractAddress, account);
  //   if (!contract.estimateGas[method]) {
  //     return undefined;
  //   }
  //   return contract.estimateGas[method](...args, overrides || {})
  //     .then((gas) => {
  //       return { gas: calculateGasMargin(gas.toString()) };
  //     })
  //     .catch((error) => {
  //       if (!contract.callStatic) {
  //         console.debug(
  //           `estimateGas failed`,
  //           contractAddress,
  //           method,
  //           args,
  //           error
  //         );
  //         return { error };
  //       }
  //       console.debug(
  //         "Gas estimate failed, trying eth_call to extract error",
  //         contractAddress,
  //         method,
  //         args,
  //         `value: ${overrides?.value?.toString()}`
  //       );

  //       return contract.callStatic[method](...args, overrides || {})
  //         .then((result) => {
  //           console.debug(
  //             "Unexpected successful call after failed estimate gas",
  //             error,
  //             result
  //           );
  //           return {
  //             error: new Error(
  //               "Unexpected issue with estimating the gas. Please try again."
  //             ),
  //           };
  //         })
  //         .catch((callError) => {
  //           console.error(
  //             "Call threw error",
  //             contractAddress,
  //             method,
  //             args,
  //             callError
  //           );
  //           const errorReason =
  //             callError.reason || callError.data?.message || callError.message;
  //           // Sentry.captureException(errorReason);
  //           return { error: errorReason };
  //         });
  //     });
  // };

  getContractMetaData = () => {
    // const contracts = networkConnectors.getContracts(
    //   this.providerStatus.activeChainId
    // );
    const multiCall = networkConnectors.getMultiAddress(
      // this.providerStatus.activeChainId
    );
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
