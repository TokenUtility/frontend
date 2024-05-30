import RootStore from "./Root";
import { makeAutoObservable } from "mobx";

export default class AppStore {
  rootStore: RootStore;

  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

}
