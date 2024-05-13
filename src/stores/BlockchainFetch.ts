import { networkConnectors } from "@/provider/networkConnectors";
import RootStore from "@/stores/Root";
import { makeObservable, action, observable } from "mobx";
import { logClient } from "@/utils";

export default class BlockchainFetchStore {
  rootStore: RootStore;

  constructor(rootStore) {
    makeObservable(this, {
      rootStore: observable,
      // blockchainFetch: action,
    });
    this.rootStore = rootStore;
  }

  // blockchainFetch(accountSwitchOverride?: boolean) {
  //   const { providerStore } = this.rootStore;
  //   const {
  //     active,
  //     activeChainId: chainId,
  //     library,
  //     account,
  //   } = providerStore.providerStatus;

  //   // TODO: need to reduce the number of requests
  //   if (
  //     active &&
  //     networkConnectors.isChainIdSupported() &&
  //     library &&
  //     account
  //   ) {
  //     library
  //       .getBlockNumber()
  //       .then((blockNumber) => {
  //         const lastCheckedBlock = providerStore.getCurrentBlockNumber;
  //         const doFetch =
  //           blockNumber !== lastCheckedBlock || accountSwitchOverride;
  //         if (doFetch) {
  //           // logClient('[Fetch Loop] Fetch Blockchain Data', {
  //           //   lastCheckedBlock,
  //           //   blockNumber,
  //           //   chainId,
  //           //   account,
  //           // });

  //           // Set block number
  //           providerStore.setCurrentBlockNumber(blockNumber);

  //           // Get global blockchain data
  //           // None

  //           // Get user-specific blockchain data
  //           if (account) {
  //             providerStore
  //               .fetchUserBlockchainData(account)
  //               .then((results) => {})
  //               .catch((e) => {
  //                 logClient(e);
  //               });
  //           } else {
  //             // tokenStore.fetchOnChainTokenDecimals(
  //             //   tokenStore.getTrackedTokenAddresses()
  //             // );
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         logClient("[Fetch Loop Failure]", {
  //           providerStore,
  //           forceFetch: accountSwitchOverride,
  //           chainId,
  //           account,
  //           library,
  //           error,
  //         });
  //         providerStore.setCurrentBlockNumber(undefined);
  //       });
  //   } else {
  //     // logClient(`[BlockchainFetch] Aborting fetch. `, {
  //     //   active,
  //     //   chainId,
  //     // });
  //   }
  // }
}
