import { Box } from "@mui/material";
import * as React from "react";
import WinAreaItem from "./components/WinAreaItem";
import FilterTokenPool from './components/FilterTokenPool'

const WinnerArena = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <FilterTokenPool />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1fr 1fr 1fr",
            xl: "1fr 1fr 1fr 1fr",
          },
          gap: { xs: 2, lg: 3.5 },
          mt: 3,
        }}
      >
        <WinAreaItem />
        <WinAreaItem />
        <WinAreaItem />
      </Box>
    </Box>
  );
};

export default WinnerArena;
