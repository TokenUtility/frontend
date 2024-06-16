import { Box, Card } from "@mui/material";
import TypoC from "@/app/components/Common/Typo";
import CardContent from "@/app/components/Common/CardContent";
import Image from "next/image";
interface InfoProps {
  title: string;
  desc?: string[];
}

const DataInfos: InfoProps[] = [
  {
    title: "1. Support",
    desc: ["Support 10+ tokens on the SUI network and more"],
  },
  {
    title: "2. Earn passive income",
    desc: [
      "Earn passive income through revenue sharing and the Pool Together service.",
    ],
  },
  {
    title: "3. Mint a personalized NFT PFP ",
    desc: [
      "The first platform that allows you to mint a personalized NFT PFP based on your token holdings. You can use it to show off with your friends that you are a premium holder or elite holder of $SUI",
    ],
  },
  {
    title: "4 .Get a Big Prize",
    desc: [
      "You don't lose anything if you join and don't win, but if you do win, you get a big prize.",
    ],
  },
  {
    title: "5. Transparent and fully on-chain.",
    desc: [
      "The results are verified by SUI VRF. It's transparent and fully on-chain.",
    ],
  },
];

const WhyTokenUtility = () => {
  return (
    <Card>
      <CardContent
        sx={{
          backgroundColor: "#fef6ee",
          color: "#fff",
          p: { xs: 3, lg: 4, xl: 4 },
        }}
      >
        <TypoC font="bold" size="h2" color="#000">
          Why Us
        </TypoC>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: 4,
            gap: { xs: 2, lg: 2, xl: 3 },
            pb: 2,
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          {DataInfos.map(({ title, desc }, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "#f2ae29",
                padding: "14px 20px",
                borderRadius: "20px",
                flex: 1,
              }}
            >
              <Box sx={{ minHeight: "54px" }}>
                <TypoC size="h5" font="bold" sx={{ mt: 1.5 }}>
                  <span>{title}</span>
                </TypoC>
              </Box>
              <Box>
                {desc.map((text, index) => (
                  <TypoC
                    sx={{ mt: 2 }}
                    size="small"
                    font="bold"
                    lineHeight={1.5}
                    key={index}
                  >
                    {text}
                  </TypoC>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WhyTokenUtility;
