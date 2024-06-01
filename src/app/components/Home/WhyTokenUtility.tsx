import { Box, Card } from "@mui/material";
import TypoC from "@/app/components/Common/Typo";
import CardContent from "@/app/components/Common/CardContent";
import { title } from "process";

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
    <Card sx={{ textAlign: "center" }}>
      <CardContent sx={{ backgroundColor: "#6f3ecf", color: "#fff" }}>
        <TypoC font="bold" size="h2">
          Why Token Utility
        </TypoC>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: 4,
            gap: { xs: 2, lg: 4, xl: 4 },
            px: { xs: 2, xl: 4 },
            pb: 2,
          }}
        >
          {DataInfos.map(({ title, desc }, index) => (
            <Box key={index}>
              <TypoC size="h5" font="bold">
                {title}
              </TypoC>
              <Box sx={{ mt: 2 }}>
                {desc.map((text, index) => (
                  <TypoC key={index} size="h5">
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
