import { Box, Card } from "@mui/material";
import TypoC from "@/app/components/Common/Typo";
import CardContent from "@/app/components/Common/CardContent";
import { InfoProps } from "@/utils/types";

const DataInfos: InfoProps[] = [
  {
    title: "1. Support",
    desc: [
      "Users can create personalized NFT PFPs (Profile Pictures) by uploading an avatar and entering a custom display name. \n Example: If you are holding SUI, you can create a Proof of Holding SUI NFT. Steps: Upload an avatar, enter a display name (e.g., @mark_kh_).",
    ],
  },
  {
    title: "2. Rewards",
    desc: [
      "By holding this NFT, you will have the opportunity to receive exclusive gifts from potential partners or participate in the reward programs of the project communities you are holding.",
    ],
  },
  {
    title: "3. Community Participation",
    desc: [
      "Share this NFT on social media to support your favorite projects. \nHelp other holders recognize you and facilitate connections, exchanges, and learning experiences.",
    ],
  },
  {
    title: "4 .Types of Proof of Holding NFTs",
    desc: [
      ` Loyalty Holder:\n For users with holdings valued under $1,000.\nPremium Holder: \nFor users with holdings valued between $1,000 and $10,000.\nElite Holder: \nFor users with holdings valued over $10,000.`,
    ],
  },
];

const WhyTokenUtility = () => {
  return (
    <Card>
      <CardContent
        sx={{
          backgroundColor: "#eeeeff",
          color: "#fff",
          p: { xs: 3, lg: 4, xl: 4 },
        }}
      >
        <TypoC font="bold" size="h2" color="#000">
          Proof of Holding
        </TypoC>
        <TypoC font="medium" size="h4" color="#000" sx={{ mt: 1, lineHeight: 1.8 }}>
          This is a new concept introduced to bring many benefits to users
          within the Sui ecosystem. <br />
          It allows users to prove their ownership by holding tokens and thereby
          receive special rewards or participate in the reward programs of the
          project communities they are holding.
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
              <Box sx={{ minHeight: "54px" }}>
                <TypoC size="h5" font="bold" sx={{ mt: 1.5 }}>
                  <span>{title}</span>
                </TypoC>
              </Box>
              <Box>
                {desc.map((text, index) => (
                  <TypoC
                    sx={{ mt: 1, whiteSpace: "pre-wrap" }}
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
