import RootStore from "./Root";
import { makeAutoObservable } from "mobx";

export default class AppStore {
  dateTimePickerModal: boolean;
  loadingModal: boolean;
  resultModal: boolean;
  shareModal: boolean;

  transactionModal: boolean;
  transactionModalContent: React.ReactNode;
  transactionClaimRewardModal: boolean;
  domain: string;
  origin: string;
  transactionModalTxResponse: any;
  transactionModalOption: {
    title?: string;
    desc?: string;
    bottom?: React.ReactNode;
    buttonLink?: any;
  };
  rootStore: RootStore;

  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.dateTimePickerModal = false;
    this.loadingModal = false;
    this.resultModal = false;
    this.shareModal = false;
    this.transactionModal = false;
    this.transactionModalTxResponse = null;
    this.transactionModalOption = {};
    this.domain = "";
    this.origin = "";
  }

  onOpenDateTimePickerModal = () => {
    this.dateTimePickerModal = true;
  };

  onCloseDateTimePickerModal = () => {
    this.dateTimePickerModal = false;
  };

  onOpenLoadingModal = () => {
    this.loadingModal = true;
  };
  onCloseLoadingModal = () => {
    this.loadingModal = false;
  };

  onOpenResultModal = () => {
    this.resultModal = true;
  };
  onCloseResultModal = () => {
    this.resultModal = false;
  };

  onOpenShareModal = () => {
    this.shareModal = true;
  };
  onCloseShareModal = () => {
    this.shareModal = false;
  };

  onOpenTransactionModal = (txResponse, option) => {
    this.transactionModalTxResponse = txResponse;
    this.transactionModal = true;
    this.transactionModalOption = option;
  };
  onCloseTransactionModal = () => {
    this.transactionModal = false;
  };

  setDomain = (value: string) => {
    this.domain = value;
  };

  setOrigin = (value: string) => {
    this.origin = value;
  };
}
