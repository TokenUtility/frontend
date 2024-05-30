
import RootStore from "./Root";
import { makeObservable, action, observable } from "mobx";
import { TransactionBlock } from "@mysten/sui.js/transactions";

export default class ArenaPoolStore {
  rootStore: RootStore;

  constructor(rootStore) {
    makeObservable(this, {
      rootStore: observable,
      deposit: action
    });
    this.rootStore = rootStore;
  }

  deposit =  async () => {
    console.debug(this)
    const { providerStore } = this.rootStore
    const contractMetadata = providerStore.getContractMetaData()

    try {
        const tx = new TransactionBlock();
        const [coin] = tx.splitCoins(tx.gas, [tx.pure(1000)]);
        tx.moveCall({
          target: `${contractMetadata.Deposit}::arena::deposit`,
          arguments: [
            tx.object('0x82dea72fc11fdec3c8f1906cfc39ef41fb46ce70e897c3d27453a1dc362c7b8d'),
            coin
          ],
        });
        const resData = await providerStore.providerStatus.activeWallet.signAndExecuteTransactionBlock({
          // @ts-ignore
          transactionBlock: tx,
        });
        console.log("executeMoveCall success", resData);
      } catch (e) {
        console.debug("executeMoveCall failed", e);
      }
  }
}
