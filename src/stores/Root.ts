import BlockchainFetchStore from "./BlockchainFetch";
import DropdownStore from "./Dropdown";
import ErrorStore from "./Error";
import NotificationStore from "./Notification";
import NotificationModalStore from "./NotificationModal";
import ProviderStore from "./Provider";
import ArenaPoolStore from "./ArenaPool";
import AppStore from "./App";
import UserStore from "./User";

export default class RootStore {
  providerStore: ProviderStore;
  errorStore: ErrorStore;
  dropdownStore: DropdownStore;
  notificationStore: NotificationStore;
  blockchainFetchStore: BlockchainFetchStore;
  notificationModalStore: NotificationModalStore;
  appStore: AppStore;
  userStore: UserStore;
  arenaPoolStore: ArenaPoolStore

  constructor() {
    this.dropdownStore = new DropdownStore(this);
    this.errorStore = new ErrorStore(this);
    this.providerStore = new ProviderStore(this);
    this.notificationStore = new NotificationStore(this);
    this.blockchainFetchStore = new BlockchainFetchStore(this);
    this.notificationModalStore = new NotificationModalStore(this);
    this.appStore = new AppStore(this);
    this.userStore = new UserStore(this);
    this.arenaPoolStore = new ArenaPoolStore(this)
  }
}
