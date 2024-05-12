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
    title: "1. Select arena pool that you holding tokens",
  },
  {
    title: "2. Select type of arena",
    descList: [
      "2X: make 2x fast",
      "10x make bigger money",
      "100x make biggest money",
    ],
  },
  {
    title: "3. Claim if you're a winner",
  },
];

export function InfoItem(props: { data: InfoProps }) {
  const { image, alt, title, descList } = props.data;
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
        <TypoC
          size="h4"
          font="medium"
          typoProps={{ className: "info-title" }}
        >
          {title}
        </TypoC>
        <ul className="how-works__list-item">
          {descList &&
            descList.map((item, index) => <li key={index}><TypoC size="h4">{item}</TypoC></li>)}
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
        display: 'flex',
      }}
    >
      <Image
        src="images/how-to-play.png"
        width={292}
        height={218}
        alt="how-to-play"
      />
      <Box sx={{pl: { xs: 4, md: 14 }}}>
        <TypoC size="h2" font="bold">
          How to Play
        </TypoC>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
            pt: { sm: 1 },
            gap: { xs: 4, xl: 6}
          }}
        >
          <InfoSection itemProps={{ sx: { pt: 16 } }}></InfoSection>
        </Box>
      </Box>
    </Box>
    </Card>
  );
}
