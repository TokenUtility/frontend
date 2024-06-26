import RootStore from "./Root";
import { makeAutoObservable, action, observable, runInAction } from "mobx";
import { Transaction } from "@mysten/sui/transactions";
import { ArenaModalProps } from "@/utils/types";
import { apiRequest, getStatsErrorMessage } from "@/utils/apiRequest";
import { networkConnectors } from "../provider/networkConnectors";
import { Arena } from "@/utils/types";
import { ARENA_CONFIG } from "@/constants";

const MODULE = {
  arena: "arena",
};

const FUNCTION = {
  joinPool: "joinPool",
  claimWinner: "claimWinner",
};

export const TIME_REFRESH_PRICE = 15;

export default class ArenaPoolStore {
  rootStore: RootStore;
  depositModal: boolean;
  confirmModal: boolean;
  dataModal: ArenaModalProps;
  timeLeftRefreshPrice: number;
  listArenas: Arena[];
  constructor(rootStore) {
    makeAutoObservable(this, {
      rootStore: observable,
      joinPool: action,
    });
    this.rootStore = rootStore;
    this.depositModal = false;
    this.confirmModal = false;
    this.timeLeftRefreshPrice = TIME_REFRESH_PRICE;
    this.dataModal = {
      arenaData: null,
      arenaPool: null,
      coins: null,
      balanceMetadata: null,
      amount: null,
      costInUsd: null,
    };
    this.listArenas = [];
  }

  get refreshPriceProcess() {
    return (this.timeLeftRefreshPrice / TIME_REFRESH_PRICE) * 100;
  }

  joinPool = async (coins, amountUsd, arenaPoolId) => {
    const { providerStore, appStore, notificationStore } = this.rootStore;
    try {
      const { activeWallet } = providerStore.providerStatus;
      const contractMetadata = providerStore.getContractData();
      const [primaryCoin, ...restCoinXs] = coins;
      console.log({ primaryCoin, restCoinXs, coins });
      const tx = new Transaction();
      // const [coinIn] = tx.splitCoins(tx.gas, [tx.pure.u64(1000)]);
      const [coinIn] = tx.splitCoins(tx.object(primaryCoin.coinObjectId), [
        tx.pure.u64(amountUsd),
      ]);
      tx.setGasBudget(10000000);

      tx.moveCall({
        target: `${contractMetadata.Pool}::${MODULE.arena}::${FUNCTION.joinPool}`,
        arguments: [
          tx.object(contractMetadata.PoolCfgId),
          tx.object(arenaPoolId),
          tx.pure.u64(amountUsd),
          coinIn,
          tx.object("0x6"),
          tx.object("0x8"),
        ],
        typeArguments: [primaryCoin.coinType],
      });
      console.log("executeMoveCall", tx);

      const result = await activeWallet.signAndExecuteTransaction({
        //@ts-ignore
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
  claimWinner = async ({ coins }) => {
    const { providerStore, appStore } = this.rootStore;
    const contractMetadata = providerStore.getContractData();
    const [primaryCoin] = coins;
    try {
      const tx = new Transaction();
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
      const result =
        await providerStore.providerStatus.activeWallet.signAndExecuteTransaction(
          {
            //@ts-ignore
            transactionBlock: tx,
          }
        );
      appStore.onOpenTransactionModal(result.digest);
      console.log("executeMoveCall success", result);
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

  setCountDownRefreshPrice = (value: number) => {
    this.timeLeftRefreshPrice = value;
    if (value <= 0) {
      this.fetchPriceArenaPool();
    }
  };

  fetchPriceArenaPool = () => {
    console.log("fetchPrice");
    this.setCountDownRefreshPrice(TIME_REFRESH_PRICE);
  };

  getListArenas = (tokenSymbol) => {
    const { notificationStore } = this.rootStore;
    const baseUrl = networkConnectors.getAPIUrl();

    return apiRequest
      .get(baseUrl + "/v1/arenas", { token: tokenSymbol })
      .then((res) => {
        runInAction(() => {
          const formatData = [];
          for (let i = 0; i < Object.keys(ARENA_CONFIG).length; i++) {
            formatData.push(res?.data?.[i] || { poolType: i });
          }
          console.log({ formatData });
          this.listArenas = formatData;
        });
        return res?.data;
      })
      .catch((err) => {
        const message = getStatsErrorMessage(err);
        notificationStore.showErrorNotification(
          message || "Something went wrong"
        );
        throw err;
      });
  };
}
