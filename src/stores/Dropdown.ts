import RootStore from "./Root";
import { makeObservable, action, observable } from "mobx";

export default class DropdownStore {
  walletDropdownVisible: boolean;
  rootStore: RootStore;

  constructor(rootStore) {
    makeObservable(this, {
      rootStore: observable,
      walletDropdownVisible: observable,
      toggleWalletDropdown: action,
      setWalletDropdownVisible: action,
    });
    this.rootStore = rootStore;
    this.walletDropdownVisible = false;
  }

  toggleWalletDropdown = () => {
    this.walletDropdownVisible = !this.walletDropdownVisible;
  };

  setWalletDropdownVisible = (visible: boolean) => {
    this.walletDropdownVisible = visible;
  };
}
