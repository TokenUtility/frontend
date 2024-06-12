import RootStore from "./Root";
import { makeAutoObservable } from "mobx";

export default class AppStore {
  rootStore: RootStore;
  loadingModal: boolean;
  transactionModal: boolean;
  transactionBlock: any;
  transactionModalOption: {
    title?: string;
    desc?: string;
    bottom?: React.ReactNode;
    buttonLink?: any;
  };
  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.loadingModal = false;
    this.transactionModal = false;
    this.transactionBlock = null;
    this.transactionModalOption = {};
  }
  onOpenLoadingModal = () => {
    this.loadingModal = true;
  };
  onCloseLoadingModal = () => {
    this.loadingModal = false;
  };
  onOpenTransactionModal = (digest) => {
    this.transactionModal = true;
    this.transactionBlock = digest
  };
  onCloseTransactionModal = () => {
    this.transactionModal = false;
  };
}
