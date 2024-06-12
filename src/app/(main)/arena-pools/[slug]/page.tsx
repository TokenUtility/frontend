"use client";
import { Container } from "@mui/material";
import React, { useEffect, useMemo, useCallback } from "react";
import { Tabs, Tab, Box, Card, Divider, Button } from "@mui/material";
import { a11yProps, CustomTabPanel } from "@/app/components/Common/Tabs";
import TypoC from "@/app/components/Common/Typo";
import CardContent from "@/app/components/Common/CardContent";
import useArenaPool from "@/hooks/useArenaPool";
import ChainIcon from "@/app/components/Common/ChainIcon";
import Link from "next/link";
import ArenaCard from "@/app/(main)/arena-pools/[slug]/components/ArenaCard";
import ArenaCardEnded from "@/app/(main)/arena-pools/[slug]/components/ArenaCardEnd";
import MinNft from "@/app/(main)/arena-pools/[slug]/components/MintNft";
import BoxEditor from "@/app/(main)/arena-pools/[slug]/components/BoxEditor";
import dynamic from "next/dynamic";
import { mapSymbolImageToken } from "@/configs";
const FlowXWidget = dynamic(() => import("@/app/components/FlowxWidget"), {
  ssr: false,
});
import { PoolType } from "@/utils/types";
import { amountFormat } from "@/utils/helpers";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";
import { CoinMetadata, PaginatedCoins } from '@mysten/sui.js/client';
import ConfirmTransactionModal from '@/app/components/Modal/ConfirmTransaction'
import TransactionModal from '@/app/components/Modal/Transaction'

const sampleDeposit = new Map([
  [
    "sui:testnet",
    "0x1fd3e7a7ac71377e6e6493be98e1579aa5228b5ad3bbe699230174a25964c1e3::arena::deposit",
  ],
]);

const TAB_LIST = ["active", "ended"];

const InfoMarketRow = ({ title, value, children }) => {
  if (!value) {
    return null;
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
      <TypoC size="h5">{title}:</TypoC>
      <TypoC size="h5" font="bold">
        {children}
      </TypoC>
    </Box>
  );
};

const BoxInfoMarket = ({ data }) => {
  const { ticker, network, price, liquidity, marketCap, totalSupply } =
    data || {};

  return (
    <Box sx={{ mt: 4 }}>
      <InfoMarketRow title={"Network"} value={network}>
        {network}
      </InfoMarketRow>
      <InfoMarketRow title={"Price"} value={price}>
        {price}
      </InfoMarketRow>
      <InfoMarketRow title={"Liquidity"} value={liquidity}>
        {liquidity}
      </InfoMarketRow>
      <InfoMarketRow title={"Market Cap"} value={marketCap}>
        {amountFormat(marketCap, 3)}
      </InfoMarketRow>
      <InfoMarketRow title={"TotalSupply"} value={totalSupply}>
        {amountFormat(totalSupply, 3)}
      </InfoMarketRow>
    </Box>
  );
};

const InfoLinkRow = ({ title, value, children }) => {
  if (!value) {
    return null;
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
      <TypoC size="h5" font="bold">
        {title}:
      </TypoC>
      <Box sx={{ textTransform: "capitalize", maxWidth: "350px" }}>
        {children}
      </Box>
    </Box>
  );
};

const BoxInfoLink = ({ data }) => {
  const { contract, officialLinks, socials } = data || {};

  return (
    <Box sx={{ mt: 4 }}>
      <InfoLinkRow title={"Contract"} value={contract}>
        {contract}
      </InfoLinkRow>
      <InfoLinkRow title={"Official links"} value={officialLinks}>
        {officialLinks?.map(({ url, id }) => (
          <Link key={id} href={url} target="_blank" style={{ margin: "6px" }}>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{
                backgroundColor: "#ffe9d2",
                color: "#000",
                borderRadius: "12px",
                py: 0.8,
              }}
            >
              {url}
            </Button>
          </Link>
        ))}
      </InfoLinkRow>
      <InfoLinkRow title={"Socials"} value={socials}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {socials?.map(({ url, id, type }) => (
            <Link key={id} href={url} target="_blank">
              <Button
                variant="contained"
                color="inherit"
                size="small"
                sx={{
                  backgroundColor: "#ffe9d2",
                  color: "#000",
                  borderRadius: "12px",
                  py: 0.8,
                  textTransform: "capitalize",
                }}
              >
                {type}
              </Button>
            </Link>
          ))}
        </Box>
      </InfoLinkRow>
    </Box>
  );
};

const AreaPools = observer(({ params }: { params: { slug: string } }) => {
  const {
    root: { providerStore },
  } = useStores();
  const { account, activeProvider, activeChainId } = useMemo(() => providerStore.providerStatus, [providerStore.providerStatus]);
  const { arenaPool, isError, isLoading } = useArenaPool(
    params.slug,
    activeChainId
  );
  const [value, setValue] = React.useState(0);
  const [balance, setBalance] = React.useState("0");
  const [coins, setCoins] = React.useState({
      data: [],
      hasNextPage: false
    });
  const [balanceMetadata, setBalanceMetadata] = React.useState<CoinMetadata>({
    decimals: 0,
    description: '',
    iconUrl: null,
    id: null,
    name: '',
    symbol: ''
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    window.history.replaceState(
      null,
      "",
      `/arena-pools/${params.slug}#${TAB_LIST[newValue]}`
    );
  };

  useEffect(() => {
    switch (window.location.hash) {
      case "#active":
        setValue(0);
        break;
      case "#ended":
        setValue(1);
        break;
      default:
        break;
    }
  }, []);

  React.useEffect(() => {
    const fetchBalance = async () => {
      if (!activeProvider || !arenaPool.address || !account) {
        setBalance("0");
        return;
      }
      try {
        // const balance = await activeProvider.getBalance({
        //   owner: account,
        //   coinType: arenaPool.address,
        // });
        const coinPromise = activeProvider.getCoins({
          owner: account,
          coinType: arenaPool.address,
        });
        const balanceMetadataPromise = activeProvider.getCoinMetadata({
          coinType: arenaPool.address,
        });
        const [coinsResult, balanceMetadataResult]= await Promise.all([coinPromise, balanceMetadataPromise]);
        // setBalance(balance);
        setCoins(coinsResult)
        setBalanceMetadata(balanceMetadataResult);
      } catch (error) {
        setBalance("0");
        console.debug(error)
      }
    };

    fetchBalance();
  }, [account, activeProvider, arenaPool.address]);

  const {
    symbol,
    network,
    price,
    liquidity,
    marketCap,
    totalSupply,
    officialLinks,
    socials,
    contract,
  } = arenaPool;

  return (
    <main id="home">
      <Container
        maxWidth="xxl"
        sx={{
          pt: { xs: 12, md: 18, lg: 17, xl: 17 },
          pb: 10,
        }}
      >
        {isLoading ? (
          "Loading..."
        ) : (
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box sx={{ flex: 1, overflow: "hidden" }}>
              <Card sx={{ backgroundColor: "#fef6ee", p: 2 }}>
                <CardContent>
                  <TypoC size="h2" font="bold">
                    {arenaPool?.name} Utilities
                  </TypoC>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}
                  >
                    {mapSymbolImageToken[arenaPool.symbol] ? (
                      <ChainIcon
                        src={mapSymbolImageToken[arenaPool.symbol]}
                        alt="sui-logo"
                        size={36}
                      />
                    ) : (
                      <Box
                        sx={{
                          background: "#eee",
                          width: "38px",
                          height: "38px",
                          borderRadius: "9999px",
                        }}
                      ></Box>
                    )}
                    <TypoC size="h3" font="bold" sx={{ ml: 1.5 }}>
                      {arenaPool?.name}
                    </TypoC>
                    <TypoC size="h3" font="bold" color="gray" sx={{ ml: 0.7 }}>
                      {arenaPool?.symbol}
                    </TypoC>
                  </Box>
                  <Box sx={{ display: "flex", gap: 6 }}>
                    <Box sx={{ flexBasis: "60%" }}>
                      <TypoC size="h3" font="bold">
                        Overview
                      </TypoC>

                      <Box style={{ whiteSpace: "pre-line" }}>
                        <BoxEditor>{arenaPool?.overview}</BoxEditor>
                      </Box>
                      <BoxInfoMarket
                        data={{
                          ticker: symbol,
                          network,
                          price,
                          liquidity,
                          marketCap,
                          totalSupply,
                        }}
                      />
                      <BoxInfoLink
                        data={{ officialLinks, socials, contract }}
                      />
                    </Box>
                    <Divider
                      color="#d8d8d8"
                      orientation="vertical"
                      sx={{ height: "unset" }}
                    />
                    <Box sx={{ flexBasis: "40%" }}>
                      <MinNft></MinNft>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box
              sx={{
                width: "350px",
                flexShrink: 0,
                boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.22)",
                borderRadius: "22px",
                overflow: "hidden",
              }}
            >
              <FlowXWidget id="detail" />
            </Box>
          </Box>
        )}

        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            mt: 8,
          }}
        >
          <TypoC size="h3" sx={{ mr: 6 }} font="bold">
            {arenaPool?.name} Arena Pool
          </TypoC>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Tabs label"
            variant="scrollable"
          >
            <Tab
              sx={{ p: 0 }}
              label={
                <Box sx={{ display: "flex" }}>
                  <TypoC
                    size="h5"
                    font="bold"
                    color="gray"
                    sx={{ textTransform: "none" }}
                  >
                    Active
                  </TypoC>
                </Box>
              }
              {...a11yProps(0, "arena-pools-page")}
            />

            <Tab
              sx={{ p: 0, ml: 1, maxWidth: "412px" }}
              label={
                <Box sx={{ display: "flex" }}>
                  <TypoC
                    size="h5"
                    font="bold"
                    color="gray"
                    typoProps={{ noWrap: true }}
                    sx={{ textTransform: "none" }}
                  >
                    Ended
                  </TypoC>
                </Box>
              }
              {...a11yProps(3, "arena-pools-page")}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} id="arena-pools-page">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
              gap: { xs: "16px", xl: "24px" },
            }}
          >
            <ArenaCard
              type={PoolType.x2}
              arenaPool={arenaPool}
              coins={coins.data}
              balanceMetadata={balanceMetadata}
            />
            <ArenaCard
              type={PoolType.x10}
              arenaPool={arenaPool}
              coins={coins.data}
              balanceMetadata={balanceMetadata}
            />
            <ArenaCard
              type={PoolType.x100}
              arenaPool={arenaPool}
              coins={coins.data}
              balanceMetadata={balanceMetadata}
            />
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} id="arena-pools-page">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: { xs: "16px", xl: "24px" },
            }}
          >
            <ArenaCardEnded
              type={PoolType.x2}
              arenaPool={arenaPool}
            ></ArenaCardEnded>
            <ArenaCardEnded
              type={PoolType.x10}
              arenaPool={arenaPool}
            ></ArenaCardEnded>
          </Box>
        </CustomTabPanel>
      </Container>
      <ConfirmTransactionModal />
      <TransactionModal />
    </main>
  );
});

export default AreaPools;
