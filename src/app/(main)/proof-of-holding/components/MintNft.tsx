import { Box, Button } from "@mui/material";
import TypoC from "@/app/components/Common/Typo";
import Image from "next/image";
import ChainIcon from "@/app/components/Common/ChainIcon";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SUILogo from "@/assets/images/tokens/101.svg";
import Link from "next/link";

const MintNft = () => {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        mt: 1,
        width: "100%",
        border: "solid 1px #e4e4e4",
      }}
    >
      <Box sx={{ background: "#fef6ee" }}>
        <Image
          src="/images/nft-of-holding/nft-default.png"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto", display: "block" }}
          alt="Arena"
        ></Image>
      </Box>
      <Box sx={{ px: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pb: 1,
            pt: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ChainIcon src={SUILogo} alt="sui-logo" size={45} />
            <TypoC size="medium" font="bold" sx={{ ml: 1.5 }}>
              SUI
            </TypoC>
          </Box>
          <Box sx={{ bottom: "0px", right: "5px" }}>
            <InfoOutlinedIcon sx={{ fontSize: "26px" }} />
          </Box>
        </Box>
        <TypoC size="small" sx={{ mt: 1 }}>
          Sui is a groundbreaking layer-1 blockchain platform designed to
          support the needs of global
        </TypoC>
        <Link href="/proof-of-holding/sui">
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            sx={{ mt: 1.5, px: 5, mb: 3 }}
          >
            Mint NFT Now
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default MintNft;
