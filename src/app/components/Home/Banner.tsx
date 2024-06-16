"use client";
import React from "react";
import { Box, Button, Container } from "@mui/material";
import Link from "next/link";
import TypoC from "@/app/components/Common/Typo";
import Image from "next/image";
import SUILogo from "@/assets/images/tokens/101.svg";
import ScreenMedia from "@/app/components/Common/ScreenMedia";
import ChainIcon from "@/app/components/Common/ChainIcon";

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
      <Box
        sx={{
          padding: {
            xs: "16px 16px 20px 16px",
            lg: "36px 0 20px 36px",
            xl: "50px 0 24px 40px",
          },
          width: { xs: "100%", sm: "65%" },
        }}
      >
        <TypoC font="bold" size="h2" color="white" lineHeight={1.4}>
          Token Utility is an innovative protocol that enables utilities for all
          tokens in the SUI network.
        </TypoC>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TypoC font="bold" size="banner-h4" sx={{ mt: 1 }}>
            Revolutionizing Token Engagement and Utility
          </TypoC>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              maxWidth: { xs: "170px", sm: "275px" },
              width: "100%",
              mt: 2,
              fontSize: "18px",
              order: { xs: 1, sm: 0 },
            }}
          >
            Get Started
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
            <TypoC font="bold" size="banner-h4" sx={{ mr: 2 }}>
              Build on Sui network
            </TypoC>
            <ChainIcon src={SUILogo} alt="sui-logo" />
          </Box>
        </Box>
      </Box>
      <Image
        src="/images/banner-img.png"
        className="banner-img"
        width={0}
        height={0}
        alt="banner"
      ></Image>
    </Box>
  );
};

export default Banner;
