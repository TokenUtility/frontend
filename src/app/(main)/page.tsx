"use client";
import Banner from "@/app/components/Home/Banner";
import TopInfo from "@/app/components/Home/TopInfo";
import WhyTokenUtility from "@/app/components/Home/WhyTokenUtility";
import ArenaTable from "@/app/components/Home/ArenaTable";
import HowToPlay from "@/app/components/Home/HowToPlay";
import FlowXWidget from "@/app/components/FlowxWidget";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <main id="home">
      <Container
        maxWidth="xxl"
        sx={{
          pt: { xs: 12, md: 18, lg: 17, xl: 17 },
          pb: 6,
        }}
      >
        <Banner />
        <Box
          sx={{ mt: { xs: 2, lg: 3 }, display: "flex", gap: { xs: 2, xl: 4 } }}
        >
          <Box sx={{ flex: 1, overflow: "auto" }}>
            <TopInfo />
          </Box>
          <Box
            sx={{
              width: {xs: "320px", xl: '350px'},
              flexShrink: 0,
              boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.22)",
              borderRadius: "22px",
              overflow: "hidden",
            }}
          >
            <FlowXWidget />
          </Box>
        </Box>
        <Box sx={{ mt: { xs: 2, lg: 6, xl: 8 } }}>
          <WhyTokenUtility />
        </Box>
        <Box sx={{ mt: { xs: 4, lg: 6, xl: 8 } }}>
          <ArenaTable />
        </Box>

        <Box sx={{ mt: { xs: 4, lg: 6, xl: 8 } }}>
          <HowToPlay />
        </Box>
      </Container>
    </main>
  );
}
