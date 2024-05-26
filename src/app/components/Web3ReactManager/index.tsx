"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";
import { getNetworkConfigs } from "@/provider/networks";
import useInterval from "@/hooks/useInterval";
import { logClient } from "@/utils";
import { useWallet } from "@suiet/wallet-kit";

const Web3Manager = observer(() => {
  const {
    root: { providerStore, blockchainFetchStore },
  } = useStores();
  const wallet = useWallet();
  const { account, status } = wallet;

  // Load on-chain data as soon as a provider is available
  useEffect(() => {
    providerStore.loadWeb3(wallet);
    console.log({ wallet: wallet });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);
  // const { active, account, library, connector } = useWallet();
  // const {
  //   active: networkActive,
  //   error: networkError,
  //   activate: activateNetwork,
  // } = useWeb3React();

  // // try to eagerly connect to an injected provider, if it exists and has granted access already
  // const triedEager = useEagerConnect();

  // // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  // useEffect(() => {
  //   if (triedEager && !networkActive && !networkError && !active) {
  //     activateNetwork(network);
  //   }
  // }, [triedEager, networkActive, networkError, activateNetwork, active]);

  // // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  // // useInactiveListener(!triedEager);

  // useEffect(() => {
  //   if (connector !== injected && active && account && library) {
  //     logClient({ library: library?.provider });
  //     providerStore.loadWeb3(library?.provider);
  //   }
  // }, [providerStore, active, account, library, connector]);

  // //Fetch user blockchain data on an interval using current params
  // blockchainFetchStore.blockchainFetch(false);
  // const secondBlock = getNetworkConfigs()?.secondBlock || 5;

  // useInterval(
  //   () => blockchainFetchStore.blockchainFetch(false),
  //   secondBlock * 1000 // 1block/1 request
  // );

  // This means no injected web3 and infura backup has failed
  return <></>;
});

export default Web3Manager;
