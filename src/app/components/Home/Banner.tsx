"use client";
import React from "react";
import { Box, Button, Container } from "@mui/material";
import Link from "next/link";
import TypoC from "@/app/components/Common/Typo";
import Image from "next/image";
import SUILogo from "@/assets/images/tokens/101.svg";
import ScreenMedia from "@/app/components/Common/ScreenMedia";

export function ChainIcon({ size = 46, src, alt, disabledResponsive = false }) {
  return (
    <ScreenMedia>
      {({ xlAndUp }) => {
        const calcSize = disabledResponsive
          ? size
          : xlAndUp
          ? size
          : size * 0.85;
        return <Image src={src} height={calcSize} width={calcSize} alt={alt} />;
      }}
    </ScreenMedia>
  );
}

const Banner = () => {
  return (
    <Box
      sx={{
        borderRadius: "27px",
        backgroundImage: "linear-gradient(to bottom, #f1be45, #f49a08)",
        display: "flex",
        position: "relative",
      }}
    >
      <Box sx={{ padding: {xs: "36px 0 20px 36px", xl: "50px 0 24px 40px"}, width: "65%" }}>
        <TypoC font="bold" size="h1" color="white" lineHeight={1.4}>
          Token Utility is an innovative protocol that enables utilities for all
          tokens.
        </TypoC>
        <TypoC font="bold" size="h4" sx={{ mt: 1 }}>
          Token holders can make at 2x, 10x, 100x fairness, transparency and
          fully on chain
        </TypoC>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          sx={{ maxWidth: "275px", width: "100%", mt: 2, fontSize: "18px" }}
        >
          Get Started
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <TypoC font="bold" size="h4" sx={{ mr: 2 }}>
            Build on Sui
          </TypoC>
          <ChainIcon src={SUILogo} alt="sui-logo" />
        </Box>
      </Box>
      <Image
        src="/images/banner-img.png"
        width={0}
        height={0}
        style={{
          height: "95%",
          width: "auto",
          position: "absolute",
          right: "10px",
          top: 0,
        }}
        alt="banner"
      ></Image>
    </Box>
  );
};

export default Banner;
