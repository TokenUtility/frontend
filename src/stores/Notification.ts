import RootStore from "./Root";
import { makeAutoObservable, action, observable } from "mobx";
import { AlertColor } from "@mui/material/Alert";

export default class NotificationStore {
  open: boolean;
  autoHideDuration: number;
  severity: AlertColor;
  message: string;
  anchorOrigin: any;
  rootStore: RootStore;

  constructor(rootStore) {
    makeAutoObservable(this, {
      rootStore: observable,
      open: observable,
      autoHideDuration: observable,
      severity: observable,
      message: observable,
      anchorOrigin: observable,
      showNotification: action,
      onClose: action,
      showErrorNotification: action,
      showSuccessNotification: action,
    });
    this.rootStore = rootStore;
    this.open = null;
    this.autoHideDuration = 6000;
    this.severity = "success";
    this.message = "";
    this.anchorOrigin = {
      vertical: "bottom",
      horizontal: "right",
    };
  }
  showNotification = (message, type) => {
    this.message = message;
    this.open = true;
    this.severity = type || this.severity;
  };
  onClose = () => {
    this.open = false;
    this.message = null;
  };
  showErrorNotification = (message) => {
    this.showNotification(message, "error");
  };
  showSuccessNotification = (message) => {
    this.showNotification(message, "success");
  };
  showWaringNotification = (message) => {
    this.showNotification(message, "warning");
  };
}
