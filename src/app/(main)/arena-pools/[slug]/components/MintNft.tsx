import { Box, Button } from "@mui/material";
import TypoC from "@/app/components/Common/Typo";

const MintNft = () => {
  return (
    <Box>
      <TypoC size="h3" font="bold">
        Giving Free NFT to Sacabam Holders
      </TypoC>
      <Box
        sx={{
          borderRadius: "10px",
          boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.22)",
          py: 2,
          px: 4,
          mt: 4,
          background: "#fff",
          width: "max-content",
        }}
      >
        <Box
          sx={{
            border: "solid 1px #979797",
            backgroundColor: "#d8d8d8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "22px",
            width: "250px",
            height: "250px",
          }}
        >
          NFT
        </Box>
        <TypoC size="small" sx={{ mt: 1 }}>
          Free Mint <br />/ 1 NFT per Wallet
        </TypoC>
        <Button variant="contained" color="secondary" sx={{ mt: 1, px: 5 }}>
          Mint NFT Now
        </Button>
      </Box>
    </Box>
  );
};

export default MintNft;
