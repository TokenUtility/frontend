"use client";
import React, { useEffect } from "react";
import { Tabs, Tab, Box, Container } from "@mui/material";
import { a11yProps, CustomTabPanel } from "@/app/components/Common/Tabs";
import dynamic from "next/dynamic";
import TypoC from "@/app/components/Common/Typo";
import Chip from "@mui/material/Chip";

const ActiveArena = dynamic(
  () => {
    return import("./ActiveArena");
  },
  { ssr: false },
);

const WinArena = dynamic(
  () => {
    return import("./WinArena");
  },
  { ssr: false },
);

const History = dynamic(
  () => {
    return import("./History");
  },
  { ssr: false },
);

const RevenueSharing = dynamic(
  () => {
    return import("./RevenueSharing");
  },
  { ssr: false },
);

function createData(donationName: string, date: string, claimed: boolean) {
  return {
    donationName,
    date,
    claimed,
  };
}

const nftRows = Array.from({ length: 4 }, (_, i) =>
  createData(
    "Donated for Name of donation project 1",
    "01/23/2022, 12:58 AM",
    i === 0 ? true : false,
  ),
);

const TAB_LIST = [
  "active-arena-pools",
  "win-arena-pools",
  "history",
  "revenue-sharing",
];

const TabBox = () => {
  const [value, setValue] = React.useState(0);
  const [totalDonation, setTotalDonation] = React.useState(0);
  const [totalContributor, setTotalContributor] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    window.history.replaceState(null, "", `/profile#${TAB_LIST[newValue]}`);
  };

  useEffect(() => {
    // console.log("Hash:", window.location.hash);
    switch (window.location.hash) {
      case "#active-arena-pools":
        setValue(0);
        break;
      case "#win-arena-pools":
        setValue(1);
        break;
      case "#history":
        setValue(2);
        break;
      case "#revenue-sharing":
        setValue(3);
        break;
      default:
        break;
    }
  }, []);

  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#fef6ee",
          pt: 4,
        }}
      >
        <Container maxWidth="xxl">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs reward pool"
            sx={{}}
            variant="scrollable"
          >
            <Tab
              sx={{ p: 0, mx: 2 }}
              label={
                <Box sx={{ display: "flex" }}>
                  <TypoC size="title-tab">Active Arena Pools</TypoC>
                  <Chip sx={{ ml: 2, height: "25px" }} label={3} />
                </Box>
              }
              {...a11yProps(0, "profile-page")}
            />
            <Tab
              sx={{ p: 0, ml: 1 }}
              label={
                <Box sx={{ display: "flex" }}>
                  <TypoC size="title-tab">Win Arena Pools</TypoC>
                  <Chip sx={{ ml: 2, height: "25px" }} label={3} />
                </Box>
              }
              {...a11yProps(1, "profile-page")}
            />
            <Tab
              sx={{ p: 0, ml: 1, maxWidth: "412px" }}
              label={
                <Box sx={{ display: "flex" }}>
                  <TypoC size="title-tab" typoProps={{ noWrap: true }}>
                    History
                  </TypoC>
                </Box>
              }
              {...a11yProps(2, "profile-page")}
            />
            <Tab
              sx={{ p: 0, ml: 1, maxWidth: "412px" }}
              label={
                <Box sx={{ display: "flex" }}>
                  <TypoC size="title-tab" typoProps={{ noWrap: true }}>
                    Revenue Sharing
                  </TypoC>
                </Box>
              }
              {...a11yProps(2, "profile-page")}
            />
          </Tabs>
        </Container>
      </Box>
      <Container maxWidth="xxl">
        <CustomTabPanel value={value} index={0} id="profile-page">
          <ActiveArena />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} id="profile-page">
          <WinArena />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} id="profile-page">
          <History />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3} id="profile-page">
          <RevenueSharing />
        </CustomTabPanel>
      </Container>
    </Box>
  );
};

export default TabBox;
