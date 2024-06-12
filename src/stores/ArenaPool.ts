import RootStore from "./Root";
import { makeAutoObservable, action, observable } from "mobx";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { ArenaModalProps } from "@/utils/types";

const MODULE = {
  arena: "arena",
};

const FUNCTION = {
  joinPool: "joinPool",
  claimWinner: "claimWinner",
};

export default class ArenaPoolStore {
  rootStore: RootStore;
  depositModal: boolean;
  confirmModal: boolean;
  dataModal: ArenaModalProps;
  constructor(rootStore) {
    makeAutoObservable(this, {
      rootStore: observable,
      joinPool: action,
    });
    this.rootStore = rootStore;
    this.depositModal = false;
    this.confirmModal = false;
    this.dataModal = {
      type: null,
      arenaPool: null,
      coins: null,
      balanceMetadata: null,
      amount: null,
      poolAmountLevel: null,
    };
  }

  joinPool = async (coins, amountUsd) => {
    const { providerStore, appStore, notificationStore } = this.rootStore;
    try {
      const { activeWallet } = providerStore.providerStatus;
      const contractMetadata = providerStore.getContractData();
      const [primaryCoin, ...restCoinXs] = coins;
      console.log({ primaryCoin, restCoinXs, coins });
      const tx = new TransactionBlock();
      // const [coinIn] = tx.splitCoins(tx.gas, [tx.pure(1000)]);
      const [coinIn] = tx.splitCoins(tx.object(primaryCoin.coinObjectId), [
        tx.pure(amountUsd),
      ]);
      tx.setGasBudget(10000000);

      tx.moveCall({
        target: `${contractMetadata.Pool}::${MODULE.arena}::${FUNCTION.joinPool}`,
        arguments: [
          tx.object(
            "0x7c14efeca862108334cdb1b20c6ba1f620693c9919032e914daed8ba9a1f80d7"
          ), // POOL_CFG_ID
          tx.object(
            "0x13636954ef59f6d789e14ab81afedb3e8f63bc0e2ba532a9467eee1c09920d08"
          ), // ARENA_POOL_ID
          tx.pure(amountUsd),
          coinIn,
          tx.object("0x6"),
          tx.object("0x8"),
        ],
        typeArguments: [primaryCoin.coinType],
      });
      console.log("executeMoveCall", tx);

      const result = await activeWallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log("executeMoveCall success", result);
      appStore.onOpenTransactionModal(result.digest);
    } catch (error) {
      const msg = (error as Error)?.message || "Something went wrong";
      notificationStore.showErrorNotification(msg);
      console.debug("executeMoveCall failed", { error });
    }
  };
  claimWinner = async (primaryCoins) => {
    const { providerStore } = this.rootStore;
    const contractMetadata = providerStore.getContractData();
    const [primaryCoin, ...restCoinXs] = primaryCoins;
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${contractMetadata.Pool}::${MODULE.arena}::${FUNCTION.claimWinner}`,
        arguments: [
          tx.object(
            "0x13636954ef59f6d789e14ab81afedb3e8f63bc0e2ba532a9467eee1c09920d08"
          ), // ARENA_POOL_ID
          tx.object(
            "0x5f162fce98f525b60346c778fd33d8cf121653f8d51096dbba43493a673fbb89"
          ), // POOL_ID
        ],
        typeArguments: [primaryCoin.coinType],
      });
      const resData =
        await providerStore.providerStatus.activeWallet.signAndExecuteTransactionBlock(
          {
            transactionBlock: tx,
          }
        );
      console.log("executeMoveCall success", resData);
    } catch (e) {
      console.debug("executeMoveCall failed", e);
    }
  };

  onOpenDepositModal = () => {
    this.depositModal = true;
  };

  onCloseDepositModal = () => {
    this.depositModal = false;
  };

  onOpenConfirmModal = (dataModal: ArenaModalProps) => {
    this.confirmModal = true;
    this.dataModal = dataModal;
  };

  onCloseConfirmModal = () => {
    this.confirmModal = false;
  };
}
