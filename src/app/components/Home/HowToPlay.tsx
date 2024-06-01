import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Image from "next/image";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import TypoC from "@/app/components/Common/Typo";
import { Card } from "@mui/material";

interface InfoProps {
  title: string;
  descList?: string[];
}

export const infoList: InfoProps[] = [
  {
    title: "1. Support 10+ tokens on the SUI network and more",
  },
  {
    title:
      "2. Earn passive income through revenue sharing and the Pool Together service.",
  },
  {
    title:
      "3. The first platform that allows you to mint a personalized NFT PFP based on your token holdings. You can use it to show off with your friends that you are a premium holder or elite holder of $SUI",
  },
  {
    title:
      "4. You don't lose anything if you join and don't win, but if you do win, you get a big prize.",
  },
  {
    title:
      "5. The results are verified by SUI VRF. It's transparent and fully on-chain.",
  },
];

export function InfoItem(props: { data: InfoProps }) {
  const { title, descList } = props.data;
  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: { sm: "column" },
        maxWidth: "265px",
      }}
      className="info-item"
    >
      <Box sx={{ mt: { xs: 1, sm: 0 } }}>
        <TypoC font="medium" typoProps={{ className: "info-title" }}>
          {title}
        </TypoC>
        <ul className="how-works__list-item">
          {descList &&
            descList.map((item, index) => (
              <li key={index}>
                <TypoC>{item}</TypoC>
              </li>
            ))}
        </ul>
      </Box>
    </Box>
  );
}

export function InfoSection({ itemProps }: { itemProps?: BoxProps }) {
  return (
    <>
      {infoList.map((info, index) => {
        return (
          <React.Fragment key={index}>
            {index !== 0 && (
              <Box
                {...itemProps}
                className="info__arrow-icon--desktop"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <EastRoundedIcon fontSize="large" />
              </Box>
            )}
            <InfoItem data={info}></InfoItem>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default function HowToPlay() {
  return (
    <Card sx={{ backgroundColor: "#eeeeff" }}>
      <Box
        sx={{
          py: { xs: 4, lg: 5, md: 6 },
          px: { xs: 2, md: 3 },
          display: "flex",
        }}
      >
        <Image
          src="images/how-to-play.png"
          width={292}
          height={218}
          alt="how-to-play"
        />
        <Box sx={{ pl: { xs: 4, lg: 4,xl: 8 } }}>
          <TypoC size="h2" font="bold">
            Why us
          </TypoC>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "flex-start",
              pt: { sm: 1 },
              gap: { xs: 1, lg: 1, xl: 2 },
            }}
          >
            <InfoSection itemProps={{ sx: { pt: 16 } }}></InfoSection>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
