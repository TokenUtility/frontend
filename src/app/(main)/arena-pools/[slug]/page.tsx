"use client";
import { Container } from "@mui/material";
import React, { useEffect, Fragment } from "react";
import { Tabs, Tab, Box, Card, Divider, Button } from "@mui/material";
import { a11yProps, CustomTabPanel } from "@/app/components/Common/Tabs";
import TypoC from "@/app/components/Common/Typo";
import CardContent from "@/app/components/Common/CardContent";
import useArenaPool from "@/hooks/useArenaPool";
import SUILogo from "@/assets/images/tokens/101.svg";
import { ChainIcon } from "@/app/components/Home/Banner";
import Link from "next/link";
import ArenaCard from "@/app/(main)/arena-pools/[slug]/components/ArenaCard";
import BoxEditor from "@/app/(main)/arena-pools/[slug]/components/BoxEditor";
import dynamic from "next/dynamic";

const FlowXWidget = dynamic(() => import("@/app/components/FlowxWidget"), { ssr: false });

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
      <InfoMarketRow title={"Marketcap"} value={marketCap}>
        {marketCap}
      </InfoMarketRow>
      <InfoMarketRow title={"TotalSupply"} value={totalSupply}>
        {totalSupply}
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

const mapSymbolImageToken = {
  SUI: SUILogo,
};

const AreaPools = ({ params }: { params: { slug: string } }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // window.history.replaceState(null, "", `/arena-pools#${TAB_LIST[newValue]}`);
  };
  const { arenaPool, isError, isLoading } = useArenaPool(params.slug);
  const {
    ticker,
    network,
    price,
    liquidity,
    marketCap,
    totalSupply,
    officialLinks,
    socials,
    contract,
  } = arenaPool;
  useEffect(() => {
    // console.log("Hash:", window.location.hash);
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
                          ticker,
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
                      <TypoC size="h3" font="bold">
                        Giving Free NFT to Sacabam Holders
                      </TypoC>
                      <Box
                        sx={{
                          borderRadius: "10px",
                          boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.22)",
                          py: 2,
                          px: 4,
                          mt: 4,
                          background: "#fff",
                          width: "max-content",
                        }}
                      >
                        <Box
                          sx={{
                            border: "solid 1px #979797",
                            backgroundColor: "#d8d8d8",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: "22px",
                            width: "250px",
                            height: "250px",
                          }}
                        >
                          NFT
                        </Box>
                        <TypoC size="small" sx={{ mt: 1 }}>
                          Free Mint <br />/ 1 NFT per Wallet
                        </TypoC>
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ mt: 1, px: 5 }}
                        >
                          Mint NFT Now
                        </Button>
                      </Box>
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
            <FlowXWidget />
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
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              gap: {xs: '16px', xl: '24px'},
            }}
          >
            <ArenaCard />
            <ArenaCard />
            <ArenaCard />
          </Box>
        </CustomTabPanel>
        <CustomTabPanel
          value={value}
          index={1}
          id="arena-pools-page"
        ></CustomTabPanel>
      </Container>
    </main>
  );
};

export default AreaPools;
