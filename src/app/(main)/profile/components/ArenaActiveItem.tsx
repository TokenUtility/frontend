import CardContent from "@/app/components/Common/CardContent";
import { Box, Card } from "@mui/material";
import TypoC from "@/app/components/Common/Typo";
import ChainIcon from "@/app/components/Common/ChainIcon";
import UserIcon from "@/app/components/Common/Icons/Profile";
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

          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <TypoC font="bold">In Progress 1/2</TypoC>&nbsp;
            <UserIcon size="18px" color="#7645d9" />
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
          <Box>
            <ul>
              <li>
                <TypoC size="small">
                  You deposit <span>10.000&nbsp; SCB</span>
                </TypoC>
              </li>

              <li>
                <TypoC size="small">
                  Platform fee <span>{PERCENT_DISTRIBUTION.PLATFORM_FEE}%</span>{" "}
                  if you Win the pool!
                </TypoC>
              </li>
            </ul>
          </Box>
        </Box>
        <TypoC sx={{ mt: 1 }} font="bold" color="gray">
          Ends in: <b>2d:4h:15m:15s</b>
        </TypoC>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <TypoC font="bold" color="primary">
            <Link href="#detail">DETAIL</Link>
          </TypoC>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArenaItem;
