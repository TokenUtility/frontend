"use client";

import React from "react";
import {
  Box,
  Button,
  Tabs,
  Tab,
  Card,
  Divider,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";
import TabProfile from "./TabBox";
import ScreenMedia from "@/app/components/Common/ScreenMedia";
import ProfileIcon from "@/app/components/Common/Icons/Profile";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { useWallet, addressEllipsis } from "@suiet/wallet-kit";
import useCopyClipboard from "@/hooks/useCopyClipboard";
import TypoC from "@/app/components/Common/Typo";

const NetWorthInfo = () => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Box>
        <TypoC font="bold">Net worth</TypoC>
        <TypoC size="xl" font="bold" sx={{ mt: 1 }}>
          $205
        </TypoC>
      </Box>
      <Divider
        color="#d8d8d8"
        orientation="vertical"
        sx={{ height: "unset" }}
      />
      <Box>
        <TypoC font="bold">Commission Rewards</TypoC>
        <TypoC size="xl" font="bold" sx={{ mt: 1 }}>
          $115.8
        </TypoC>
      </Box>
    </Box>
  );
};

const ProfilePage = () => {
  const { connected, address } = useWallet();
  const [isCopied, setCopied] = useCopyClipboard();

  return (
    <Box sx={{ pt: { xs: 12, md: 18, lg: 17, xl: 17 }, pb: 6 }}>
      <Box sx={{ backgroundColor: " #fef6ee", pt: 8, pb: 0 }}>
        <Container
          maxWidth="xxl"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box
                sx={{
                  backgroundColor: "#7646d9",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(118, 70, 217, 0.5)",
                  },
                  width: "43px",
                  height: "43px",
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ScreenMedia>
                  {({ xsOnly }) => (
                    <ProfileIcon size={xsOnly ? "24px" : "30px"} />
                  )}
                </ScreenMedia>
              </Box>
              <TypoC size="h1" font="bold" lineHeight={1.2}>
                {addressEllipsis(address) || "__"}
              </TypoC>
              <IconButton aria-label="edit">
                <BorderColorOutlinedIcon
                  style={{ fontSize: "32px", color: "#000" }}
                />
              </IconButton>
            </Box>
            <TypoC
              size="xl"
              font="bold"
              sx={{ display: "flex", ml: 8, gap: 1, alignItems: "center" }}
            >
              {addressEllipsis(address) || "__"}
              <Tooltip title={isCopied ? "Copied" : "Copy"}>
                <IconButton onClick={() => setCopied(address)}>
                  <ContentCopyOutlinedIcon style={{ color: "#000" }} />
                </IconButton>
              </Tooltip>
            </TypoC>
          </Box>
          <NetWorthInfo></NetWorthInfo>
        </Container>
      </Box>
      <TabProfile />
    </Box>
  );
};

export default ProfilePage;
