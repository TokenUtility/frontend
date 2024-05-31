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
import { logClient } from "@/utils";
import { ChainId } from "@/constants";
import { isAddressEqual } from "@/utils/helpers";
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { WalletContextState, SuiProvider } from "@suiet/wallet-kit";

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

export interface TokenMetadata {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  precision?: number;
  isSupported?: boolean;
  allowance?: BigNumber;
  chainId?: ChainId;
}
export interface ProviderStatus {
  activeChainId: ChainId;
  account: string;
  library: any;
  active: boolean;
  injectedLoaded: boolean;
  injectedActive: boolean;
  injectedChainId: string;
  injectedWeb3: any;
  backUpLoaded: boolean;
  backUpWeb3: any;
  activeProvider: SuiProvider;
  activeWallet: WalletContextState;
  error: Error;
}

export default class ProviderStore {
  chainData: ChainData;
  providerStatus: ProviderStatus;
  initializedProvider: boolean;
  rootStore: RootStore;

  constructor(rootStore: any) {
    makeAutoObservable(this, {
      rootStore: observable,
      chainData: observable,
      providerStatus: observable,
      initializedProvider: observable,
      isConnect: computed,
      currentBlockNumber: computed,
      getCurrentBlockNumber: computed,
      setCurrentBlockNumber: action,
      updateChainData: action,
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
    this.providerStatus.activeWallet = null;
    this.initializedProvider = false;
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

  loadProvider = async (wallet:WalletContextState, provider: SuiProvider) => {
    try {
      if (wallet.on) {
        logClient(`[Provider] Subscribing Listeners`);
        wallet.on("chainChange", () => {console.log('chainChange')}); // For now assume network/chain ids are same thing as only rare case when they don't match
        wallet.on("accountChange", this.handleAccountsChanged);
      }

      runInAction(() => {
        this.providerStatus.injectedLoaded = true;
        this.providerStatus.active = true;
        this.providerStatus.injectedChainId = wallet.chain.id;
        this.providerStatus.activeProvider = provider;
        this.providerStatus.activeWallet = wallet;
        this.setAccount(wallet.address);
      });

      logClient(`[Provider] Injected provider loaded.`);
    } catch (err) {
      console.error(`[Provider] Injected Error`, err);
      runInAction(() => {
        this.providerStatus.injectedLoaded = false;
        this.providerStatus.injectedChainId = null;
        this.setAccount("");
        this.providerStatus.active = false;
        this.providerStatus.activeProvider = null;
        this.providerStatus.activeWallet = null;
      });
    }
  };

  async loadWeb3(wallet: WalletContextState, provider: SuiProvider) {
    const { connected, chain } = wallet;

    if (connected) {
      logClient(`[Provider] Loading Injected Provider`);
      await this.loadProvider(wallet, provider);
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
        this.providerStatus.activeProvider = null;
        this.providerStatus.activeWallet = null;
        this.providerStatus.injectedActive = false
        this.providerStatus.injectedLoaded = false
        const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
        console.log({a: suiClient, b: getFullnodeUrl('testnet')})
      });
    }
    runInAction(() => {
      this.providerStatus.active = true;
      this.initializedProvider = true;
    });

    logClient(`[Provider] Provider Active.`, this.providerStatus);
  }

  getContractMetaData = () => {
    const contracts = networkConnectors.getContracts(
      this.providerStatus.activeChainId
    );
    const contractMetadata = {
      Deposit: contracts.DEPOSIT
    };
    return contractMetadata;
  };
}
