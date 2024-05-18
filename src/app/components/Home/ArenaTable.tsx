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
import { PoolType } from "@/utils/types";

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

const ArenaTable = () => {
  const wallet = useWallet();
  const { chain } = wallet;
  const { data, isError, isLoading, arenaPools } = useArenaPools({
    chain: chain?.id,
  });
  const isEmpty = data?.[0]?.docs?.length === 0;

  return (
    <TableContainer component={Paper} sx={{ px: 2, py: 4 }}>
      <TypoC font="bold" size="h2">
        Arena Pools on SUI chain
      </TypoC>
      <Divider color="#979797" sx={{ mb: 3, mt: 1 }}></Divider>
      <Table
        sx={{
          borderCollapse: "separate",
          borderSpacing: "0px 8px",
        }}
        aria-label="active pool table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={styleTableCellHead}>#</TableCell>
            <TableCell sx={styleTableCellHead}>Tokens</TableCell>
            <TableCell sx={styleTableCellHead}>Price</TableCell>
            <TableCell sx={styleTableCellHead}>24h Change</TableCell>
            <TableCell sx={styleTableCellHead}>7D Change</TableCell>
            <TableCell sx={styleTableCellHead}>
              <ArenaImageBox type={PoolType.x2} sizeImage={76}>
                Arena Pool
              </ArenaImageBox>
            </TableCell>
            <TableCell sx={styleTableCellHead}>
              <ArenaImageBox type={PoolType.x10} sizeImage={76}>
                Arena Pool
              </ArenaImageBox>
            </TableCell>
            <TableCell sx={styleTableCellHead}>
              <ArenaImageBox type={PoolType.x100} sizeImage={76}>
                Arena Pool
              </ArenaImageBox>
            </TableCell>
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
            return arenaPools?.map((row, index) => (
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
                  <TypoC size="h5" font="bold">
                    {index + 1}
                  </TypoC>
                </TableCell>
                <TableCell
                  sx={{
                    ...styleTableCell,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {mapSymbolImageToken[row.symbol] ? (
                      <ChainIcon
                        src={mapSymbolImageToken[row.symbol]}
                        alt="sui-logo"
                        size={45}
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

                    <TypoC size="h5" font="bold" sx={{ ml: 1.5 }}>
                      {row.name || "__"}
                    </TypoC>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    ...styleTableCell,
                  }}
                >
                  <TypoC size="h5" font="bold">
                    {row.price ? `$${row.price}` : "__"}
                  </TypoC>
                </TableCell>
                <TableCell
                  sx={{
                    ...styleTableCell,
                    textAlign: "center",
                  }}
                >
                  {row.dayChange || "__"}
                </TableCell>
                <TableCell
                  sx={{
                    ...styleTableCell,
                    textAlign: "center",
                  }}
                >
                  {row.weekChange || "__"}
                </TableCell>
                <TableCell sx={styleTableCell}>
                  <Link href={`/arena-pools/${row.id}`}>
                    <Button
                      variant="contained"
                      color="inherit"
                      size="small"
                      sx={{ py: 0.5, borderRadius: "11px" }}
                    >
                      <ArenaImageBox type={PoolType.x2} sizeImage={30}>
                        &nbsp;Join Pool
                      </ArenaImageBox>
                    </Button>
                  </Link>
                </TableCell>
                <TableCell sx={styleTableCell}>
                  <Link href={`/arena-pools/${row.id}`}>
                    <Button
                      variant="contained"
                      color="inherit"
                      size="small"
                      sx={{ py: 0.5, borderRadius: "11px" }}
                    >
                      <ArenaImageBox type={PoolType.x10} sizeImage={30}>
                        &nbsp;Join Pool
                      </ArenaImageBox>
                    </Button>
                  </Link>
                </TableCell>
                <TableCell sx={styleTableCell}>
                  <Link href={`/arena-pools/${row.id}`}>
                    <Button
                      variant="contained"
                      color="inherit"
                      size="small"
                      sx={{ py: 0.5, borderRadius: "11px" }}
                    >
                      <ArenaImageBox type={PoolType.x100} sizeImage={30}>
                        &nbsp;Join Pool
                      </ArenaImageBox>
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="inherit"
        size="large"
        sx={{ display: "flex", alignItems: "center", color: "#000", mt: 2 }}
        fullWidth={true}
      >
        View All Arena Pools <EastRoundedIcon sx={{ mr: 2 }}></EastRoundedIcon>
      </Button>
    </TableContainer>
  );
};

export default ArenaTable;
