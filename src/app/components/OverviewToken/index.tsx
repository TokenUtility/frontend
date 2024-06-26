"use client";
import React from "react";
import { Box, Card, Button } from "@mui/material";
import TypoC from "@/app/components/Common/Typo";
import CardContent from "@/app/components/Common/CardContent";
import ChainIcon from "@/app/components/Common/ChainIcon";
import Link from "next/link";
import BoxEditor from "@/app/(main)/arena-pools/[slug]/components/BoxEditor";
import dynamic from "next/dynamic";
import { mapSymbolImageToken } from "@/configs";
const FlowXWidget = dynamic(() => import("@/app/components/FlowxWidget"), {
  ssr: false,
});
import { amountFormat } from "@/utils/helpers";


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

const OverviewToken = ({arenaPool, isLoading}) => {
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

  return <> {isLoading ? (
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
              <Box >
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
  )}</>;
};

export default OverviewToken;
