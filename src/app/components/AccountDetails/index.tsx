"use client";
import { useWeb3React } from "@web3-react/core";
import { observer } from "mobx-react";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styled from "@emotion/styled";
import { useStores } from "@/contexts/storesContext";
import { injected } from "@/provider/connectors";
import { shortenAddress } from "@/utils";
import { getEtherscanLink } from "@/utils";
import Button from "@mui/material/Button";
import Identicon from "../Identicon";
import Copy from "./Copy";

const HeaderRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 0 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === "blue" ? "#fff" : "inherit")};

  @media (min-width: 900px) {
    padding: 1rem;
  }
`;

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;

const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid #7f7f7f;
  border-radius: 12px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
`;

const AccountGroupingRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: #fff;

  div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
`;

const AccountSection = styled.div`
  margin: 0 1rem;
  @media (min-width: 900px) {
    padding: 0rem 1rem 1.5rem 1rem;
  }
`;

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`;

const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AddressLink = styled.a`
  font-size: 0.825rem;
  color: #c4c4c4;
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  :hover {
    color: #abb2c8;
  }
`;

const WalletName = styled.div`
  width: initial;
  font-size: 0.825rem;
  font-weight: 500;
  color: #7f7f7f;
`;

const IconWrapper = styled.div<{ size?: number }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + "px" : "32px")};
    width: ${({ size }) => (size ? size + "px" : "32px")};
  }
  @media (min-width: 900px) {
    align-items: flex-end;
  }
`;

const WalletAction = styled(Button)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

interface AccountDetailsProps {
  toggleWalletModal: () => void;
  ENSName?: string;
  openOptions: () => void;
}

const AccountDetails = observer(
  ({ toggleWalletModal, ENSName, openOptions }: AccountDetailsProps) => {
    const {
      root: { providerStore },
    } = useStores();
    const { activeChainId: chainId, account } = providerStore.providerStatus;
    const { connector } = useWeb3React();
    function formatConnectorName() {
      return <WalletName>Connected</WalletName>;
    }

    function getStatusIcon() {
      return (
        <IconWrapper size={16}>
          <Identicon />
        </IconWrapper>
      );
    }

    return (
      <>
        <UpperSection>
          <HeaderRow>Account</HeaderRow>
          <AccountSection>
            <YourAccount>
              <InfoCard>
                <AccountGroupingRow>
                  {formatConnectorName()}
                  <div>
                    {connector !== injected && (
                      <WalletAction
                        style={{
                          fontSize: ".825rem",
                          fontWeight: 400,
                          marginRight: "8px",
                        }}
                        onClick={() => {
                          (connector as any).close();
                        }}
                      >
                        Disconnect
                      </WalletAction>
                    )}
                    <WalletAction
                      style={{ fontSize: ".825rem", fontWeight: 400 }}
                      onClick={() => {
                        openOptions();
                      }}
                    >
                      Change
                    </WalletAction>
                  </div>
                </AccountGroupingRow>
                <AccountGroupingRow id="web3-account-identifier-row">
                  <AccountControl>
                    {ENSName ? (
                      <>
                        <div>
                          {getStatusIcon()}
                          <p> {ENSName}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          {getStatusIcon()}
                          <p> {account && shortenAddress(account)}</p>
                        </div>
                      </>
                    )}
                  </AccountControl>
                </AccountGroupingRow>
                <AccountGroupingRow>
                  {ENSName ? (
                    <>
                      <AccountControl>
                        <div>
                          {account && (
                            <Copy toCopy={account}>
                              <span style={{ marginLeft: "4px" }}>
                                Copy Address
                              </span>
                            </Copy>
                          )}
                          {chainId && account && (
                            <AddressLink
                              href={
                                chainId &&
                                getEtherscanLink(chainId, ENSName, "address")
                              }
                              target="_blank"
                            >
                              <OpenInNewIcon></OpenInNewIcon>
                              <span style={{ marginLeft: "4px" }}>
                                View on BscScan
                              </span>
                            </AddressLink>
                          )}
                        </div>
                      </AccountControl>
                    </>
                  ) : (
                    <>
                      <AccountControl>
                        <div>
                          {account && (
                            <Copy toCopy={account}>
                              <span style={{ marginLeft: "4px" }}>
                                Copy Address
                              </span>
                            </Copy>
                          )}
                          {chainId && account && (
                            <AddressLink
                              href={getEtherscanLink(
                                chainId,
                                account,
                                "address"
                              )}
                              target="_blank"
                            >
                              <OpenInNewIcon></OpenInNewIcon>
                              <span style={{ marginLeft: "4px" }}>
                                View on BscScan
                              </span>
                            </AddressLink>
                          )}
                        </div>
                      </AccountControl>
                    </>
                  )}
                </AccountGroupingRow>
              </InfoCard>
            </YourAccount>
          </AccountSection>
        </UpperSection>
      </>
    );
  }
);

export default AccountDetails;
