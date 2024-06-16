import { Box, Card } from "@mui/material";
import TypoC from "@/app/components/Common/Typo";
import CardContent from "@/app/components/Common/CardContent";
import Image from "next/image";

const DataInfos = [
  {
    title: "1. Utilities of token",
    desc: [
      "We research carefully and provide detail utilities of tokens, it helps our users have more insight before investing",
    ],
  },
  {
    title: "2. Pools",
    desc: [
      "We create different kind of pools for user to engage and make money",
      "- Arena pool: A fair, transparent, on-chain place where users can multiply their token holdings (x2, x10, x100) by becoming winners. The result is verified by SUI VRF.",
      "- Pool together: A no-loss lottery where users have a chance to win big prizes.",
    ],
  },
  {
    title: "3. Proof of holding",
    desc: [
      "- Custom NFT PFPs featuring your own avatar and username.",
      "- On-chain proof of loyalty, premium, or elite holder status based on token holdings for the projects you love",
    ],
  },
  {
    title: "4. Swap",
    desc: [
      "- Integration with various AMM and DEX aggregators to provide the best user experience.",
    ],
  },
  {
    title: "5. Revenue Sharing",
    desc: [
      "- The sharing range is between 10%-70%, depending on your role: normal users get 10%, strategic partners get 50%, and early supporters get 70%.",
    ],
  },
];

const WhyTokenUtility = () => {
  return (
    <Card>
      <CardContent sx={{ backgroundColor: "#eeeeff", color: "#fff" }}>
        <TypoC font="bold" size="h2" color="#6f3ecf">
          Our Services
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
                backgroundColor: "#6f3ecf",
                padding: "14px 20px",
                borderRadius: "20px",
                flex: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "space-between",
                }}
              >
                <TypoC size="h5" font="bold" sx={{ mt: 1.5 }}>
                  <span>{title}</span>
                </TypoC>
                <Image
                  src={`/images/home/service-${index + 1}.webp`}
                  width={93}
                  height={93}
                  alt="our-service"
                ></Image>
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
