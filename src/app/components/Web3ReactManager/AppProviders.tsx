"use client";
import React, { useEffect, useState } from "react";
import getLibrary from "@/utils/getLibrary";
import dynamic from "next/dynamic";
import { SWRConfig } from "swr";
import { fetcher } from "@/configs/fetcher";
import { createClient } from "@/lib/subgraph/client";
import { ApolloProvider } from "@apollo/client";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";
import PreLoader from "@/app/components/PreLoader";
import styled from "@emotion/styled";
import {WalletProvider} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

const Web3ReactManager = dynamic(
  () => {
    return import("@/app/components/Web3ReactManager");
  },
  { ssr: false }
);

const MessageWrapper = styled.div<{ hidden?: boolean }>`
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  height: calc(100vh);
  background-color: #fff;
  position: fixed;
  z-index: 999999;
  width: 100%;
`;

const AppProviders = observer(({ children }) => {
  const {
    root: { providerStore },
  } = useStores();
  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (process.browser) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);


  return (
      <WalletProvider>
      {/* <MessageWrapper
        hidden={!showLoader &&  providerStore.providerStatus.active }
      >
        <PreLoader />
      </MessageWrapper> */}
      <Web3ReactManager />
      <SWRConfig
        value={{
          fetcher: fetcher,
          revalidateIfStale: true,
          revalidateOnFocus: false,
          revalidateOnReconnect: true,
          onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            // Never retry on 404.
            if (error.status === 404) return;
            if (error.status === 400) return;

            // Never retry for a specific key.
            if (key === "/v1/users/") return;

            // Only retry up to 5 times.
            if (retryCount >= 5) return;

            // Retry after 5 seconds.
            setTimeout(() => revalidate({ retryCount }), 5000);
          },
        }}
      >
        <ApolloProvider
          client={createClient(providerStore.providerStatus.activeChainId)}
        >
          {children}
        </ApolloProvider>
      </SWRConfig>
      </WalletProvider>
  );
});

export default AppProviders;
