import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Card,
} from "@mui/material";
import * as React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { mapSymbolImageToken, listToken } from "@/configs";
import Image from "next/image";
import ChainIcon from "@/app/components/Common/ChainIcon";
import TypoC from "@/app/components/Common/Typo";
import ArenaActiveItem from "./components/ArenaActiveItem";
import HistoryTable from "./components/HistoryTable";

const History = () => {
  const [historyType, setHistoryType] = React.useState("1");
  const handleHistoryType = (event: SelectChangeEvent) => {
    setHistoryType(event.target.value);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Box sx={{ minWidth: 300, borderRadius: "22px", overflow: "hidden" }}>
          <FormControl fullWidth variant="filled">
            <Select
              labelId="history-select-label"
              id="history-select"
              value={historyType}
              onChange={handleHistoryType}
            >
              <MenuItem value={1} sx={{ py: 1.5, px: 2, fontWeight: "bold" }}>
                DEPOSIT
              </MenuItem>
              <MenuItem value={2} sx={{ py: 1.5, px: 2, fontWeight: "bold" }}>
                CLAIM
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <HistoryTable />
    </Box>
  );
};

export default History;
