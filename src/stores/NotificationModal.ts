import RootStore from "./Root";
import { makeObservable, action, observable } from "mobx";

export default class NotificationStore {
  open: boolean;
  message: string;
  status: string;
  desc: string;

  rootStore: RootStore;

  constructor(rootStore) {
    makeObservable(this, {
      rootStore: observable,
      open: observable,
      message: observable,
      status: observable,
      desc: observable,
      showNotification: action,
      onClose: action,
    });
    this.rootStore = rootStore;
    this.open = null;
    this.message = "";
    this.status = "";
    this.desc = "";
  }
  showNotification = (message) => {
    this.message = message.text;
    this.desc = message.desc;
  };
  onClose = () => {
    this.message = null;
    this.desc = null;
    this.status = null;
  };
}
