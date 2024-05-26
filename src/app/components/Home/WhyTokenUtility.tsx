import { Box, Card } from "@mui/material";
import TypoC from "@/app/components/Common/Typo";
import CardContent from "@/app/components/Common/CardContent";
import { title } from "process";

const DataInfos = [
  {
    title: "Provide Utilities of token",
    desc: "We research carefully and provide detail utilities of tokens, it helps our users have more insight before investing",
  },
  {
    title: "Arena pool",
    desc: "This is an innovative way to makes 2x , 10x, 100x fairness, transparency and fully on chain",
  },
  {
    title: "Swap",
    desc: "We integrate with other DEX aggregators without fee to bring the best rate to our users",
  },
  {
    title: "User profile",
    desc: "We provide a tool to help our user manage their portfolio, their arena and revenue sharing.",
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
            gap: { xs: 3, lg: 6, xl: 8 },
            px: { xs: 2, xl: 4 },
            pb: 2,
          }}
        >
          {DataInfos.map(({ title, desc }, index) => (
            <Box key={index}>
              <TypoC size="h5" font="bold">
                {title}
              </TypoC>
              <TypoC sx={{ mt: 2 }} size="h5">
                {desc}
              </TypoC>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WhyTokenUtility;
