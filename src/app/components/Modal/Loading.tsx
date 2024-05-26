"use client";
import * as React from "react";
import { Box, Typography, Modal } from "@mui/material";
import { Dots } from "@/app/components/PreLoader";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { useStores } from "@/contexts/storesContext";
import { observer } from "mobx-react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "#171717",
  border: "1px solid transparent",
  borderRadius: "20px",
  boxShadow: 24,
  px: 4,
  py: 6,
  textAlign: "center",
};

function AppCircularProgress(props: CircularProgressProps) {
  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={56}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        color="primary"
        size={56}
        sx={{ position: "absolute", left: 0 }}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

const LoadingModal = observer(() => {
  const {
    root: { appStore },
  } = useStores();

  return (
    <div>
      <Modal
        open={appStore.loadingModal}
        onClose={appStore.onCloseLoadingModal}
        aria-labelledby="loading-modal-title"
        aria-describedby="loading-modal-description"
      >
        <Box sx={style}>
          <AppCircularProgress />
          <Typography sx={{ fontSize: "24px", fontWeight: "bold", mt: 3 }}>
            <Dots>Loading</Dots>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              color: "#a9a9a9",
              fontSize: "20px",
              fontWeight: "medium",
            }}
          >
            Preparing request….
          </Typography>
        </Box>
      </Modal>
    </div>
  );
});
export default LoadingModal;
