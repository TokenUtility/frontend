"use client";
import { observer } from "mobx-react";
import React, { useState} from "react";
import styled from "@emotion/styled";
import { ChainId } from "@/constants";
import { useStores } from "@/contexts/storesContext";
import { shortenAddress } from "@/utils";
import { toBalanceFormatted, fromMIST, amountFormat } from "@/utils/helpers";
import Image from "next/image";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { ConnectButton, useWallet, addressEllipsis } from "@suiet/wallet-kit";
import { useAccountBalance } from "@suiet/wallet-kit";
import { isMobile } from "react-device-detect";
import Button from "@/app/components/Common/Button";

export const YellowCard = styled.div`
  background-color: rgba(243, 132, 30, 0.05);
  color: #f3841e;
  font-weight: 500;
`;

const WalletButton = styled.button`
  color: #000;
  display: flex;
  flex-flow: row nowrap;
  outline: none;
  border: none;
  background: transparent;
  padding: 0.5rem;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 40px;
  width: 100%;
  :focus {
    outline: none;
  }
`;

const Error = styled.button`
  background-color: #f3841e;
  border: 1px solid #f3841e;
  display: flex;
  flex-flow: row nowrap;
  font-size: 0.9rem;
  align-items: center;
  padding: 0.5rem;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
  color: #ffffff;
  font-weight: 500;
`;

const ErrorMessage = styled.span`
  margin: 0 0.5rem 0 0.25rem;
  font-size: 0.83rem;
  color: #fff;
`;

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ededed;
  border-radius: 10px;
  white-space: nowrap;
  min-width: 140px;
  :focus {
    border: 1px solid blue;
  }
`;

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  pointer-events: auto;
`;

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  border-radius: 4px;
  padding: 10px 12px;
  height: 100%;
`;

const StyledBalance = styled.div`
  padding: 0 8px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.87);
`;

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.DEVNET]: "Devnet",
  [ChainId.TESTNET]: "Testnet",
};

const Wallet = observer(() => {
  const {
    root: { dropdownStore, providerStore },
  } = useStores();
  const { activeChainId, active, error, injectedActive, injectedLoaded } =
    providerStore.providerStatus;

  const { balance } = useAccountBalance();
  const { connected, address } = useWallet();

  // if (!activeChainId && active) {
  //   // throw new Error(`No chain ID specified ${activeChainId}`);
  //   console.error(`No chain ID specified ${activeChainId}`);
  //   return null;
  // }

  function getWalletDetails() {
    // Wrong network
    if (injectedLoaded && !injectedActive) {
      return (
        <Error>
          <WarningAmberRoundedIcon></WarningAmberRoundedIcon>
          <ErrorMessage>Wrong Network</ErrorMessage>
        </Error>
      );
    } else if (connected) {
      return (
        <React.Fragment>
          {!isMobile && activeChainId && NETWORK_LABELS[activeChainId] && (
            <TestnetWrapper>
              <NetworkCard className="network-card">
                {NETWORK_LABELS[activeChainId]}
              </NetworkCard>
            </TestnetWrapper>
          )}
          <AccountElement
            active={!!address}
            style={{ pointerEvents: "auto" }}
            className="account-element"
          >
            <StyledBalance>
              {amountFormat(fromMIST(balance as unknown as number))} SUI
            </StyledBalance>
            <WalletButton>
              <span>{addressEllipsis(address)}</span>
            </WalletButton>
          </AccountElement>
        </React.Fragment>
      );
    } else if (error) {
      return (
        <Error>
          <SignalCellularAltIcon />
          <ErrorMessage>Error</ErrorMessage>
        </Error>
      );
    } else {
      return (
        <div>
          <ConnectButton label="Connect Wallet" />
        </div>
      );
    }
  }

  return <>{getWalletDetails()}</>;
});

export default Wallet;
