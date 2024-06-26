import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import TypoC from "@/app/components/Common/Typo";
import Link from "next/link";
import ChainIcon from "@/app/components/Common/ChainIcon";
import Image from "next/image";
import { ReactNode } from "react";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useWallet } from "@suiet/wallet-kit";
import useArenaPools from "@/hooks/useArenaPools";
import ArenaImageBox from "@/app/components/Common/ArenaImageBox";
import { mapSymbolImageToken } from "@/configs";
import {
  HISTORY_TYPE,
  HISTORY_STATUS_COLOR,
  HISTORY_STATUS,
} from "@/constants";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useGetSuiScanLink } from "@/hooks/useEtherscanLink";

const styleTableCellHead = {
  fontSize: { xs: "16px", lg: "16px", xl: "18px" },
  color: "#707072",
  px: 1.5,
  py: 1.5,
};

const styleTableCell = {
  fontSize: { xs: "16px", lg: "16px", xl: "18px" },
  color: "unset",
  px: 1.5,
  py: 1.5,
};

const history = [
  {
    date: "2024-04-18 10:31:01",
    type: HISTORY_TYPE.DEPOSIT,
    id: "Sui - X2 Arena Pool #3 - $100",
    amount: "50.000",
    tokenSymbol: "SUI",
    status: HISTORY_STATUS.SUCCESS,
    winned: true,
    transactionHash: "0xxx",
  },
  {
    date: "2024-04-18 10:31:01",
    type: HISTORY_TYPE.DEPOSIT,
    id: "Sui - X2 Arena Pool #3 - $100",
    amount: "50.000",
    tokenSymbol: "SUI",
    status: HISTORY_STATUS.PROCESSING,
    winned: true,
    transactionHash: "0xxx",
  },
  {
    date: "2024-04-18 10:31:01",
    type: HISTORY_TYPE.DEPOSIT,
    id: "Sui - X2 Arena Pool #3 - $100",
    amount: "50.000",
    tokenSymbol: "FLX",
    status: HISTORY_STATUS.FAILED,
    winned: false,
    transactionHash: "0xxx",
  },
];

const ArenaTable = () => {
  const isEmpty = history.length === 0;
  const getSuiScanLink = useGetSuiScanLink();

  return (
    <TableContainer component={Paper} sx={{ px: 2, py: 4, mt: 2 }}>
      <Table
        sx={{
          borderCollapse: "separate",
          borderSpacing: "0px 8px",
        }}
        aria-label="active pool table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={styleTableCellHead}>Date</TableCell>
            <TableCell sx={styleTableCellHead}>Type</TableCell>
            <TableCell sx={styleTableCellHead}>Arena Pool ID</TableCell>
            <TableCell sx={styleTableCellHead}>Amount</TableCell>
            <TableCell sx={styleTableCellHead}>Status</TableCell>
            <TableCell sx={styleTableCellHead}>Winner</TableCell>
            <TableCell sx={styleTableCellHead}>Tx</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(() => {
            if (isEmpty) {
              return (
                <TypoC size="label" sx={{ textAlign: "center" }}>
                  No data to display
                </TypoC>
              );
            }
            return history?.map((row, index) => (
              <TableRow
                key={index}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    ...styleTableCell,
                  }}
                >
                  {row.date}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    ...styleTableCell,
                    textTransform: "capitalize",
                  }}
                >
                  {row.type?.toLocaleLowerCase()}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    ...styleTableCell,
                  }}
                >
                  {row.id}
                </TableCell>

                <TableCell
                  sx={{
                    ...styleTableCell,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TypoC
                      size="h5"
                      font="bold"
                      color="primary"
                      sx={{ mr: 1.5 }}
                    >
                      <span>{row.amount || "__"}</span> &nbsp;
                      {row.tokenSymbol || "__"}
                    </TypoC>

                    {mapSymbolImageToken[row.tokenSymbol] ? (
                      <ChainIcon
                        src={mapSymbolImageToken[row.tokenSymbol]}
                        alt="sui-logo"
                        size={28}
                        disabledResponsive={true}
                      />
                    ) : (
                      <Box
                        sx={{
                          background: "#eee",
                          width: "38px",
                          height: "38px",
                          borderRadius: "9999px",
                        }}
                      ></Box>
                    )}
                  </Box>
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    ...styleTableCell,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textTransform: "capitalize",
                    }}
                  >
                    <Box
                      sx={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "999px",
                        backgroundColor:
                          HISTORY_STATUS_COLOR[row.status] || "#aaa",
                        marginRight: "16px",
                      }}
                    />
                    {row.status?.toLocaleLowerCase()}
                  </Box>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    ...styleTableCell,
                  }}
                >
                  {row.winned ? "You’re the winner" : "You’re not the winner"}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    ...styleTableCell,
                    padding: { xs: "8px 16px", xl: "12px 16px" },
                  }}
                >
                  <a
                    href={getSuiScanLink(row.transactionHash, "transaction")}
                    target="_blank"
                  >
                    <IconButton>
                      <OpenInNewIcon />
                    </IconButton>
                  </a>
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ArenaTable;
