import FilterTokenPool from "./FilterTokenPool";
import TypoC from "@/app/components/Common/Typo";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

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

const dataTable = [
  {
    code: "1uqnl6ctb",
    userID: "1uqnl6ctb",
    joiningDate: "2024-04-18 10:31:01",
    poolID: "Sacabam - X2 Arena Pool #3 - $100",
    commissionEarned: "+ 50 SCB",
    commissionEarnedUSD: "10.2 $",
  },
  {
    code: "1uqnl6ctb",
    userID: "1uqnl6ctb",
    joiningDate: "2024-04-18 10:31:01",
    poolID: "Sacabam - X2 Arena Pool #3 - $100",
    commissionEarned: "+ 50 SCB",
    commissionEarnedUSD: "10.2 $",
  },
  {
    code: "1uqnl6ctb",
    userID: "1uqnl6ctb",
    joiningDate: "2024-04-18 10:31:01",
    poolID: "Sacabam - X2 Arena Pool #3 - $100",
    commissionEarned: "+ 50 SCB",
    commissionEarnedUSD: "10.2 $",
  },
];

const MyRevenueSharing = () => {
  const isEmpty = dataTable.length === 0;

  return (
    <Box
      sx={{
        borderRadius: "27px",
        border: "solid 1px #eee",
        padding: "24px",
      }}
    >
      <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <TypoC size="xl" font="bold">
          My Revenue Sharing
        </TypoC>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <FilterTokenPool />
        </Box>
      </Box>
      <Box>
        <TableContainer component={Paper} sx={{ mt: 2, border: "none" }}>
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
                <TableCell sx={styleTableCellHead}>Code</TableCell>
                <TableCell sx={styleTableCellHead}>Friend’s User ID</TableCell>
                <TableCell sx={styleTableCellHead}>
                  Friend’s Joining Date
                </TableCell>
                <TableCell sx={styleTableCellHead}>Arena Pool ID</TableCell>
                <TableCell sx={styleTableCellHead}>Commission Earned</TableCell>
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
                return dataTable?.map((row, index) => (
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
                      {index + 1}
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        ...styleTableCell,
                      }}
                    >
                      {row.code}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        ...styleTableCell,
                      }}
                    >
                      {row.userID}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        ...styleTableCell,
                      }}
                    >
                      {row.joiningDate}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        ...styleTableCell,
                      }}
                    >
                      {row.poolID}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        ...styleTableCell,
                      }}
                    >
                      <TypoC font="bold">{row.commissionEarned}</TypoC>
                      <TypoC color="gray" size="tiny-small">
                        {row.commissionEarnedUSD}
                      </TypoC>
                    </TableCell>
                  </TableRow>
                ));
              })()}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default MyRevenueSharing;
