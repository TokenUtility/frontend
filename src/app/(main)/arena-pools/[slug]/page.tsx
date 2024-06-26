"use client";
import { Container } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { a11yProps, CustomTabPanel } from "@/app/components/Common/Tabs";
import TypoC from "@/app/components/Common/Typo";
import ArenaCard from "@/app/(main)/arena-pools/[slug]/components/ArenaCard";
import ArenaCardEnded from "@/app/(main)/arena-pools/[slug]/components/ArenaCardEnd";
import dynamic from "next/dynamic";
const FlowXWidget = dynamic(() => import("@/app/components/FlowxWidget"), {
  ssr: false,
});
import { PoolType } from "@/utils/types";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";
import { CoinMetadata } from "@mysten/sui/client";
import ConfirmTransactionModal from "@/app/components/Modal/ConfirmTransaction";
import TransactionModal from "@/app/components/Modal/Transaction";
import OverviewToken from "@/app/components/OverviewToken";
import useArenaPool from "@/hooks/useArenaPool";
import { fetcher } from "@/configs/fetcher";

const TAB_LIST = ["active", "ended"];

const AreaPools = observer(({ params }: { params: { slug: string } }) => {
  const {
    root: { providerStore, arenaPoolStore },
  } = useStores();
  const { listArenas } = arenaPoolStore;

  const [value, setValue] = React.useState(0);
  const [balance, setBalance] = React.useState("0");
  const [coins, setCoins] = React.useState({
    data: [],
    hasNextPage: false,
  });
  const [balanceMetadata, setBalanceMetadata] = React.useState<CoinMetadata>({
    decimals: 0,
    description: "",
    iconUrl: null,
    id: null,
    name: "",
    symbol: "",
  });

  const { account, activeProvider, activeChainId } = useMemo(
    () => providerStore.providerStatus,
    [providerStore.providerStatus]
  );

  const { arenaPool, isError, isLoading } = useArenaPool(
    params.slug,
    activeChainId
  );

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
        const [coinsResult, balanceMetadataResult] = await Promise.all([
          coinPromise,
          balanceMetadataPromise,
        ]);
        // setBalance(balance);
        setCoins(coinsResult);
        setBalanceMetadata(balanceMetadataResult);
      } catch (error) {
        setBalance("0");
        console.debug(error);
      }
    };

    fetchBalance();
  }, [account, activeProvider, arenaPool.address]);

  useEffect(() => {
    if (arenaPool.symbol) {
      arenaPoolStore.getListArenas(arenaPool.symbol);
    }
  }, [arenaPool, arenaPoolStore]);

  useEffect(() => {
    const timer = setInterval(() => {
      arenaPoolStore.setCountDownRefreshPrice(
        arenaPoolStore.timeLeftRefreshPrice - 1
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
    window.history.replaceState(
      null,
      "",
      `/arena-pools/${params.slug}#${TAB_LIST[newValue]}`
    );
  }

  return (
    <main id="home">
      <Container
        maxWidth="xxl"
        sx={{
          pt: { xs: 12, md: 18, lg: 17, xl: 17 },
          pb: 10,
        }}
      >
        <OverviewToken arenaPool={arenaPool} isLoading={isLoading} />

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
            {listArenas.map((arena, index) => (
              <ArenaCard
                key={index}
                arenaPool={arenaPool}
                coins={coins.data}
                arenaData={arena}
                balanceMetadata={balanceMetadata}
              />
            ))}
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
