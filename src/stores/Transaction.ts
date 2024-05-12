import {
  TransactionResponse,
  TransactionReceipt,
} from "@ethersproject/providers";

import _ from "lodash";
import { makeObservable, action, observable } from "mobx";
import { isAddress, toChecksum } from "../utils";
import RootStore from "./Root";
export interface TransactionRecord {
  hash: string;
  response: TransactionResponse;
  blockNumberChecked: number;
  createdTime: number;
  receipt: TransactionReceipt | undefined;
  summary?: string;
}

const ERRORS = {
  unknownTxHash: "Transaction hash is not stored",
  unknownNetworkId: "NetworkID specified is not tracked",
  txHashAlreadyExists: "Transaction hash already exists for network",
  txHasNoHash: "Attempting to add transaction record without hash",
};

export enum FetchCode {
  SUCCESS,
  FAILURE,
  STALE,
}

export interface TransactionRecordMap {
  [index: string]: TransactionRecord[];
}

export default class TransactionStore {
  txRecords: TransactionRecordMap;
  rootStore: RootStore;

  constructor(rootStore: any) {
    makeObservable(this, {
      rootStore: observable,
      txRecords: observable,
      loadTxRecords: action,
      addTransactionRecord: action,
      checkPendingTransactions: action,
      clearTxRecords: action,
    });
    this.rootStore = rootStore;
    this.txRecords = {} as TransactionRecordMap;

    this.loadTxRecords();
  }

  loadTxRecords() {
    this.txRecords = this.getSavedTxRecords(); // {} as TransactionRecordMap;
  }
  // @dev Transactions are pending if we haven't seen their receipt yet
  getPendingTransactions(account: string): TransactionRecord[] {
    const checksum = toChecksum(account);
    if (checksum && this.txRecords[checksum]) {
      const records = this.txRecords[checksum];
      return records.filter((value) => {
        return this.isTxPending(value);
      });
    }

    return [] as TransactionRecord[];
  }

  getConfirmedTransactions(account: string): TransactionRecord[] {
    const checksum = toChecksum(account);
    if (checksum && this.txRecords[checksum]) {
      const records = this.txRecords[checksum];
      return records.filter((value) => {
        return !this.isTxPending(value);
      });
    }

    return [] as TransactionRecord[];
  }

  hasPendingTransactions(account: string): boolean {
    const pending = this.getPendingTransactions(account);
    return pending.length > 0;
  }

  // @dev Add transaction record. It's in a pending state until mined.
  addTransactionRecord(
    account: string,
    txResponse: TransactionResponse,
    summary?: string
  ) {
    const record: TransactionRecord = {
      hash: txResponse.hash,
      response: txResponse,
      blockNumberChecked: 0,
      createdTime: Math.ceil(Date.now() / 1000),
      receipt: undefined,
      summary,
    };

    const txHash = txResponse.hash;

    if (!txHash) {
      throw new Error("Attempting to add transaction record without hash");
    }
    const checksum = toChecksum(account);

    const records = checksum && this.txRecords[checksum];

    if (records) {
      const duplicate = records.find((value: any) => value.hash === txHash);
      if (!!duplicate) {
        throw new Error(ERRORS.txHashAlreadyExists);
      }
      this.txRecords[checksum].push(record);
    } else {
      this.txRecords[checksum] = [] as TransactionRecord[];
      this.txRecords[checksum].push(record);
    }
    this.saveTxRecords();
  }

  async checkPendingTransactions(account: string): Promise<FetchCode> {
    const { providerStore } = this.rootStore;
    const currentBlock = providerStore.getCurrentBlockNumber;
    const checksum = toChecksum(account);
    const library = providerStore.providerStatus.library;
    if (checksum && this.txRecords[checksum]) {
      const records = this.txRecords[checksum];
      records.forEach((value) => {
        if (
          this.isTxPending(value) &&
          this.isStale(value, currentBlock) &&
          library
        ) {
          library
            .getTransactionReceipt(value.hash)
            .then((receipt: any) => {
              value.blockNumberChecked = currentBlock;
              if (receipt) {
                value.receipt = _.omit(receipt, [
                  "logs",
                  "logsBloom",
                ]) as unknown as TransactionReceipt;
              }
            })
            .catch(() => {
              value.blockNumberChecked = currentBlock;
            });
        }
      });
    }

    return FetchCode.SUCCESS;
  }

  saveTxRecords() {
    const { providerStore } = this.rootStore;
    const { activeChainId } = providerStore.providerStatus;
    try {
      const _records = window.localStorage.getItem("liquid_tx_records");
      const records = JSON.parse(_records);
      if (records && /^0x/.test(Object.keys(records)[0])) {
        window.localStorage.setItem(
          "liquid_tx_records",
          JSON.stringify({
            "1": this.txRecords,
          })
        );
        return;
      }
      window.localStorage.setItem(
        "liquid_tx_records",
        JSON.stringify(
          Object.assign({}, records, {
            [activeChainId]: this.txRecords,
          })
        )
      );
    } catch (e) {}
  }

  getSavedTxRecords(): any {
    const { providerStore } = this.rootStore;
    const { activeChainId } = providerStore.providerStatus;
    const txRecords = {} as TransactionRecordMap;
    try {
      const data = window.localStorage.getItem("liquid_tx_records") || "";
      const allRecords: TransactionRecordMap = JSON.parse(data);
      let records = {};
      if (allRecords && /^0x/.test(Object.keys(allRecords)[0])) {
        records = allRecords;
      } else {
        records = allRecords[activeChainId];
      }
      if (records) {
        Object.entries(records).forEach(([key, trans]) => {
          if (isAddress(key)) {
            txRecords[key] = Array.isArray(trans) ? trans : [];
          }
        });
      }
    } catch (e) {}
    return txRecords;
  }

  clearTxRecords(): void {
    try {
      window.localStorage.removeItem("liquid_tx_records");
      this.txRecords = {} as TransactionRecordMap;
    } catch (e) {}
  }

  checkTxConfirmed(account: string, txId: string): boolean {
    const checksum = toChecksum(account);
    if (checksum && this.txRecords[checksum]) {
      const records = this.txRecords[checksum];
      const finder = records.find(
        (r) => r.hash?.toLowerCase() === txId?.toLowerCase()
      );
      return !this.isTxPending(finder);
    }
    return false;
  }

  waitTx = async (txId: string, timeout: number = 600000): Promise<any> => {
    return new Promise((resolve, reject) => {
      const { providerStore, transactionStore } = this.rootStore;
      const { account } = providerStore.providerStatus;
      const duration = 1500;
      let count = 0;
      const max = timeout / duration;
      const timer = setInterval(async () => {
        const isConfirmed = transactionStore.checkTxConfirmed(account, txId);
        if (isConfirmed) {
          clearInterval(timer);
          resolve(true);
        } else if (count > max) {
          reject({
            message: "[waitTx] timeout",
            params: { txId, timeout },
          });
        }
        count += 1;
      }, duration);
    });
  };

  private isTxPending(txRecord: TransactionRecord): boolean {
    return !txRecord?.receipt;
  }

  private isStale(txRecord: TransactionRecord, currentBlock: number) {
    return txRecord.blockNumberChecked < currentBlock;
  }
}
