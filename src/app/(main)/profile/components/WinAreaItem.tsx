import CardContent from "@/app/components/Common/CardContent";
import { Box, Card } from "@mui/material";
import TypoC from "@/app/components/Common/Typo";
import ChainIcon from "@/app/components/Common/ChainIcon";
import { mapSymbolImageToken } from "@/configs";
import { PERCENT_DISTRIBUTION } from "@/constants";
import Link from "next/link";

const ArenaItem = () => {
  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.22)",
        borderRadius: "10px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            backgroundColor: "#f6f6f6",
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "10px",
            px: 2,
            py: 1,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ChainIcon
              src={mapSymbolImageToken["SUI"]}
              alt="sui-logo"
              size={28}
              disabledResponsive={true}
            />
            <TypoC font="bold" size="xl">
              SUI
            </TypoC>
          </Box>
        </Box>
        <TypoC font="bold" sx={{ mt: 1.8 }}>
          ID: Sui - X2 Arena Pool #25
        </TypoC>
        <TypoC font="bold" color="primary" sx={{ mt: 1.5 }}>
          Ticket $100
        </TypoC>
        <Box
          sx={{
            borderRadius: "22px",
            border: "solid 1px #ededed",
            pl: 3,
            pr: 1,
            py: 1.5,
            mt: 1,
          }}
        >
          <TypoC size="small" sx={{ mb: 1.5 }}>
            <span className="color-primary">Congratulations!</span> You Win all
            this Pool.
          </TypoC>
          <Box>
            <ul>
              <li>
                <TypoC size="small">
                  You deposited <span>10.000 Sui ≈ $100</span>
                </TypoC>
              </li>

              <li>
                <TypoC size="small">
                  Platform fee <span>{PERCENT_DISTRIBUTION.PLATFORM_FEE}%</span>
                </TypoC>
              </li>
            </ul>
            <TypoC size="xl" sx={{ mt: 1.5 }}>
              <span style={{ fontSize: "15px", fontWeight: 400 }}>
                Ready to claim
              </span>{" "}
              <b>180.000 Sui</b>
            </TypoC>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <TypoC font="bold" color="primary">
            <Link href="#detail">Claim Now</Link>
          </TypoC>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArenaItem;
