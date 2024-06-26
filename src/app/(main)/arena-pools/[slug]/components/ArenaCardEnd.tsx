import {
  Box,
  Button,
  Typography,
  Tooltip,
  IconButton,
  Checkbox,
} from "@mui/material";
import ArenaImageBox from "@/app/components/Common/ArenaImageBox";
import TypoC from "@/app/components/Common/Typo";
import { TransferLinkAddress } from "@/app/components/Common/TransferLink";
import { shortenAddress } from "@/utils";

const mockupAddress =
  "0xab73ad38c63f83eda02182422b545395be1d3caeb54b5869159a9f70b678cd56";
const mockupTxBlock = "eAnsxtfz2yZ1QdeEQbisERDXMPEUNdMRu4J4gr3Bnzx";

const ArenaCardEnded = ({ type, arenaPool }) => {
  return (
    <Box
      sx={{
        borderRadius: "27px",
        boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.22)",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ArenaImageBox type={type} sizeImage={76}>
          Arena Pool
        </ArenaImageBox>
      </Box>
      <TypoC size="h5" font="bold" sx={{ mt: 1 }}>
        {arenaPool?.name || "__"} - X{type} Arena Pool #1
      </TypoC>
      <Box sx={{ fontWeight: 700, mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2
          }}
        >
          <Box>Pool limit</Box>
          <Box>10000 SCB</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2
          }}
        >
          <Box>Winner</Box>
          <Box>{shortenAddress(mockupAddress)}</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2
          }}
        >
          <Box>Tx</Box>
          <Box>
            <TransferLinkAddress
              address={mockupTxBlock}
              type="transaction"
            ></TransferLinkAddress>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ArenaCardEnded;
