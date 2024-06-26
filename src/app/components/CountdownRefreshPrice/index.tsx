import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number; seconds: number }
) {
  return (
    <Box sx={{ position: "relative", display: "flex", width: "fit-content" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: "50%",
          left: "50%",
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="#fff"
          fontWeight={700}
          sx={{ display: "flex", alignItems: "center" }}
        >{`${Math.round(props.seconds)}`}</Typography>
      </Box>
    </Box>
  );
}

const CountdownRefreshPrice = observer(() => {
  const {
    root: { arenaPoolStore },
  } = useStores();
  const {
    timeLeftRefreshPrice,
    refreshPriceProcess,
    fetchPriceArenaPool
  } = arenaPoolStore;

  return (
    <Box onClick={() => fetchPriceArenaPool()} className="cursor-pointer">
      <CircularProgressWithLabel
        value={refreshPriceProcess}
        size={24}
        thickness={4}
        seconds={timeLeftRefreshPrice}
        color="inherit"
      />
    </Box>
  );
});

export default CountdownRefreshPrice;
