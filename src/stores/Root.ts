import { web3Window as window } from "@/provider/Web3Window";
import BlockchainFetchStore from "./BlockchainFetch";
import DropdownStore from "./Dropdown";
import ErrorStore from "./Error";
import NotificationStore from "./Notification";
import NotificationModalStore from "./NotificationModal";
import ProviderStore from "./Provider";
import TokenStore from "./Token";
import TransactionStore from "./Transaction";
import AppStore from "./App";
import UserStore from "./User";

export default class RootStore {
  providerStore: ProviderStore;
  errorStore: ErrorStore;
  dropdownStore: DropdownStore;
  notificationStore: NotificationStore;
  transactionStore: TransactionStore;
  tokenStore: TokenStore;
  blockchainFetchStore: BlockchainFetchStore;
  notificationModalStore: NotificationModalStore;
  appStore: AppStore;
  userStore: UserStore;

  constructor() {
    this.dropdownStore = new DropdownStore(this);
    this.errorStore = new ErrorStore(this);
    this.providerStore = new ProviderStore(this);
    this.notificationStore = new NotificationStore(this);
    this.transactionStore = new TransactionStore(this);
    this.tokenStore = new TokenStore(this);
    this.blockchainFetchStore = new BlockchainFetchStore(this);
    this.notificationModalStore = new NotificationModalStore(this);
    this.appStore = new AppStore(this);
    this.userStore = new UserStore(this);
    this.asyncSetup().catch((e) => {
      // TODO: Add retry on these fetches
      throw new Error("Async Setup Failed " + e);
    });
  }

  async asyncSetup() {
    if (typeof window !== "undefined") {
      const windowEthereum = window.ethereum || window.BinanceChain;
      if (!windowEthereum) {
        await new Promise((resolve) => {
          setTimeout(resolve, 500);
        });
      }
      // Load on-chain data as soon as a provider is available
      // await this.providerStore.loadWeb3();
    }
  }
}
