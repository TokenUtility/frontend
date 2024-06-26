"use client";
import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";
import { getNetworkConfigs } from "@/provider/networks";
import useInterval from "@/hooks/useInterval";
import { logClient } from "@/utils";
import { useWallet} from "@suiet/wallet-kit";
import { getCookie, bnum } from "@/utils/helpers";

const Web3Manager = observer(() => {
  const {
    root: { providerStore, blockchainFetchStore, userStore },
  } = useStores();
  const wallet = useWallet();
  // @ts-ignore
  const { account, status } = wallet;
  let logging = useRef(false);

  const authData = getCookie("auth_data")
    ? JSON.parse(getCookie("auth_data"))
    : "";
  const { accessToken } = authData;
  useEffect(() => {
    if(wallet.status === 'connecting') return
    providerStore.loadWeb3(wallet);
    if (
      wallet.connected &&
      !userStore.profile.address &&
      !logging.current &&
      !accessToken
    ) {
      logging.current = true;
      // userStore.handleLoginWallet().finally(() => {
      //   logging.current = false;
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return <></>;
});

export default Web3Manager;
