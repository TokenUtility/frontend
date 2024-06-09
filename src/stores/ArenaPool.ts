
import RootStore from "./Root";
import { makeObservable, action, observable } from "mobx";
import { TransactionBlock } from "@mysten/sui.js/transactions";

const MODULE = {
  arena: "arena"
}
const FUNCTION = {
  joinPool: 'joinPool'
}

export default class ArenaPoolStore {
  rootStore: RootStore;

  constructor(rootStore) {
    makeObservable(this, {
      rootStore: observable,
      joinPool: action
    });
    this.rootStore = rootStore;
  }

  joinPool =  async (primaryCoins, amountUsd = 10) => {
    const { providerStore } = this.rootStore
    const contractMetadata = providerStore.getContractData()
    const [primaryCoin,...restCoinXs] = primaryCoins
    try {
        const tx = new TransactionBlock();
        // const [coinIn] = tx.splitCoins(tx.gas, [tx.pure(1000)]);
        const [coinIn] = tx.splitCoins(tx.object(primaryCoin.coinObjectId), [tx.pure(amountUsd)]);
        console.log({primaryCoin,restCoinXs, coinIn})
        tx.moveCall({
          target: `${contractMetadata.Pool}::${MODULE.arena}::${FUNCTION.joinPool}`,
          arguments: [
            tx.object('0x36d16175a473e61e76b1a94d0ca456fa5e5a8c37c5f2234f41c263fb843c1bc6'),
            tx.object('0x6eeebf0615744a664632702ddc3d7b5c7b4fca8fb9bf2a5dbb26e04c05bfdcab'),
            tx.pure(amountUsd),
            coinIn
          ],
        });
        tx.setGasBudget(10000000);
        const resData = await providerStore.providerStatus.activeWallet.signAndExecuteTransactionBlock({
          transactionBlock: tx,
        });
        console.log("executeMoveCall success", resData);
      } catch (e) {
        console.debug("executeMoveCall failed", e);
      }
  }
}
