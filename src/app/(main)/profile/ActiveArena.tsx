import { Box } from "@mui/material";
import * as React from "react";
import ArenaActiveItem from "./components/ArenaActiveItem";
import FilterTokenPool from './components/FilterTokenPool';

const ActiveArena = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <FilterTokenPool />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr' },
          gap: { xs: 2, lg: 3.5 },
          mt: 3
        }}
      >
        <ArenaActiveItem />
        <ArenaActiveItem />
        <ArenaActiveItem />
      </Box>
    </Box>
  );
};

export default ActiveArena;
