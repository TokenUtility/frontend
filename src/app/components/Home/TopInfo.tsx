import { Card } from "@mui/material";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import TypoC from "@/app/components/Common/Typo";
import ChainIcon from "@/app/components/Common/ChainIcon";
import SUILogo from "@/assets/images/tokens/101.svg";
import FlowXLogo from "@/assets/images/tokens/flowx.png";
import SacabamLogo from "@/assets/images/tokens/sacabam.png";
import CardContent from "@/app/components/Common/CardContent";
import { shortenAddress } from "@/utils";
import { amountFormat, fromMIST, toMIST } from "@/utils/helpers";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Image from "next/image";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { RevenueSharingInfo } from "@/app/(main)/profile/RevenueSharing";

const MockupWinners = [
  {
    address: "0xda46Bc0102bba3D64A3637104e3891247E1085Fa",
    amount: toMIST(2200),
    tokenSymbol: "SUI",
    poolName: "SUI",
    tokenImage: SUILogo,
  },
  {
    address: "0xda46Bc0102bba3D64A3637104e3891247E1085Fa",
    amount: toMIST(2200),
    tokenSymbol: "SCB",
    poolName: "Sacabam",
    tokenImage: SacabamLogo,
  },
  {
    address: "0xda46Bc0102bba3D64A3637104e3891247E1085Fa",
    amount: toMIST(2200),
    tokenSymbol: "xFLX",
    poolName: "FlowX Finance x100",
    tokenImage: FlowXLogo,
  },
  {
    address: "0xda46Bc0102bba3D64A3637104e3891247E1085Fa",
    amount: toMIST(2200),
    tokenSymbol: "SUI",
    poolName: "SUI",
    tokenImage: SUILogo,
  },
  {
    address: "0xda46Bc0102bba3D64A3637104e3891247E1085Fa",
    amount: toMIST(2200),
    tokenSymbol: "SUI",
    poolName: "SUI",
    tokenImage: SUILogo,
  },
];

const MockupArenaPools = [
  {
    poolImage: "/images/pool/sui.png",
    poolName: "SUI",
    numUser: 99,
    tokenImage: SUILogo,
  },
  {
    poolImage: "/images/pool/flowx.jpg",
    poolName: "FLowX Finance",
    numUser: 50,
    tokenImage: FlowXLogo,
  },
  {
    poolImage: "/images/pool/sacabam.jpg",
    poolName: "Sacabam",
    numUser: 20,
    tokenImage: SacabamLogo,
  },
  {
    poolImage: "/images/pool/sui.png",
    poolName: "SUI",
    numUser: 30,
    tokenImage: SUILogo,
  },
];

const Winner = ({ data, sx }) => {
  const { address, amount, tokenSymbol, poolName, tokenImage } = data;
  return (
    <Box sx={{ display: "flex", gap: 2, ...sx }}>
      <ChainIcon
        src={tokenImage}
        alt="pool-img"
        size={59}
        disabledResponsive={true}
      />
      <Box>
        <TypoC size="tiny-small" font="bold">
          {shortenAddress(address)}
        </TypoC>
        <TypoC size="tiny-small" color="green" font="bold">
          Won - {amountFormat(fromMIST(amount)) || "__"} {tokenSymbol}
        </TypoC>
        <TypoC size="tiny-small" color="gray" font="bold">
          In {poolName} Arena Pool
        </TypoC>
      </Box>
    </Box>
  );
};

const poolTogetherDetails = [
  "Deposit to a Vault",
  "Receive Tickets",
  "Win Prizes",
  "Withdraw Anytime",
];

const ArenaPools = ({ data, sx }) => {
  const { poolImage, poolName, numUser, tokenImage } = data;
  return (
    <Box
      sx={{
        ...sx,
        borderRadius: "12px",
        boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.25)",
        margin: "10px",
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Image
          src={poolImage}
          width={0}
          height={0}
          style={{ width: "100%", height: "auto", display: "block" }}
          alt="Arena"
        />
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(33, 33, 33, 0.7)",
            padding: "3px 5px",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        >
          <PersonOutlineOutlinedIcon
            style={{ fontSize: "16px", color: "#fe9a2c" }}
          />{" "}
          {numUser}
        </Box>
      </Box>
      <Box sx={{ position: "relative", pb: 2.5, px: 1, pt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ChainIcon src={tokenImage} alt="sui-logo" size={45} />
          <TypoC size="medium" font="bold" sx={{ ml: 1.5 }}>
            {poolName}
          </TypoC>
        </Box>
        <Box sx={{ position: "absolute", bottom: "0px", right: "5px" }}>
          <InfoOutlinedIcon></InfoOutlinedIcon>
        </Box>
      </Box>
    </Box>
  );
};

const TopInfo = () => {
  return (
    <Box
      sx={{ display: "flex", gap: { xs: 2, lg: 3 }, flexDirection: "column" }}
    >
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", py: 1 }}>
            <TypoC font="bold" size="h3" sx={{ mr: 3 }}>
              Fairness, Transparency and Fully on chain
            </TypoC>{" "}
            <ChainIcon src={SUILogo} alt="sui-logo" />
          </Box>
        </CardContent>
      </Card>

      {/* <Card sx={{ backgroundColor: "#eeeeff" }}>
          <CardContent>
            <TypoC
              font="bold"
              size="h3"
              sx={{ display: "flex", alignItems: "center" }}
            >
              Latest Winners
            </TypoC>
            <Box sx={{ overflow: "auto" }}>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                {MockupWinners.map((data, index) => (
                  <Winner key={index} data={data} sx={{ width: "190px" }} />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card> */}

      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, xl: 3 },
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {/* widget - PoolTogether - gapX2 - mainPaddingX2  */}
        <Box
          sx={{
            flex: 1,
            maxWidth: {
              xs: "calc(100vw - 16px - 16px)",
              lg: "calc(100vw - 320px - 350px - 16px - 16px - 24px - 24px)",
            },
          }}
        >
          <Card sx={{ backgroundColor: "#fef6ee" }}>
            <CardContent sx={{ pb: { xs: 1, lg: 1, xl: 1 } }}>
              <TypoC
                font="bold"
                size="h3"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Popular Arena Pools
              </TypoC>
              <Box
                sx={{
                  display: "flex",
                  gap: 0,
                  mt: 0,
                  mx: "-10px",
                  overflow: "auto",
                }}
              >
                {MockupArenaPools.map((data, index) => (
                  <ArenaPools
                    key={index}
                    data={data}
                    sx={{ width: "200px", flexShrink: 0, overflow: "hidden" }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ width: { lg: "350px" }, flexShrink: 0 }}>
          <Card sx={{ backgroundColor: "#fef6ee", height: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TypoC
                  font="bold"
                  size="h3"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  Pool Together
                </TypoC>
                <Box
                  sx={{
                    borderRadius: "8px",
                    py: 0.5,
                    px: 1,
                    color: "#fff",
                    backgroundImage:
                      "linear-gradient(270deg, rgba(254,150,47,1) 0%, rgba(253,166,32,1) 20%, rgba(221,123,174,1) 71%, rgba(155,116,241,1) 100%)",
                    fontSize: "12px",
                  }}
                >
                  Coming Soon
                </Box>
              </Box>
              <Box sx={{ pb: 2, pt: 2 }}>
                <ul className="list-pool-together">
                  {poolTogetherDetails.map((text, index) => (
                    <li
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <CheckCircleOutlineIcon />
                      <TypoC font="bold" sx={{ ml: 1.5 }}>
                        {text}
                      </TypoC>
                    </li>
                  ))}
                </ul>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <RevenueSharingInfo />
    </Box>
  );
};

export default TopInfo;
