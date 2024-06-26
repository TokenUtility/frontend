"use client";
import { Button, Box } from "@mui/material";
import ModalC from "@/app/components/Modal";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";
import { formatBalanceWithCommas } from "@/utils/helpers";
import TypoC from "@/app/components/Common/Typo";
import Image from "next/image";
import { ARENA_CONFIG } from "@/constants";

const ConfirmModal = observer(() => {
  const {
    root: { arenaPoolStore, appStore },
  } = useStores();

  const { joinPool, dataModal } = arenaPoolStore;

  function onConfirm() {
    arenaPoolStore.onCloseConfirmModal();
    joinPool(dataModal.coins, dataModal.amount, dataModal.arenaData.id);
  }

  return (
    <ModalC
      open={arenaPoolStore.confirmModal}
      aria-labelledby="donate-confirm-modal-title"
      aria-describedby="donate-confirm-modal-description"
      sx={{ width: 450 }}
    >
      <div style={{ textAlign: "center" }}>
        <Box><Image src="/images/icons/deposit.svg" width="82" height="82" alt=""></Image></Box>
        <TypoC sx={{mt: 1}} size="h2" font="medium">Deposit</TypoC>
        <TypoC
          size="medium"
          color="label"
          font="medium"
          sx={{
            mt: 2,
          }}
        >
          to {dataModal.arenaPool?.name || "__"} - {ARENA_CONFIG[dataModal.arenaData?.poolType]?.arenaName} Arena Pool #1
        </TypoC>
        <Box
          sx={{
            fontSize: { xs: "19px", sm: "21px", xl: "24px" },
            fontWeight: 700,
            mt: 0.3,
          }}
        >
          {formatBalanceWithCommas(dataModal.amount)} {dataModal.arenaPool?.symbol}
        </Box>
        <TypoC
          size="medium"
          color="label"
          font="medium"
          sx={{
            mt: 2,
          }}
        >
          You Will Have
        </TypoC>
        <Box
          sx={{
            fontSize: { xs: "19px", sm: "21px", xl: "24px" },
            fontWeight: 700,
            mt: 0.3,
          }}
        >
          1·ticket ${dataModal.costInUsd}
        </Box>
        <TypoC sx={{mt: 2}} font="medium">Would you like to confirm this transaction?</TypoC>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            gap: 2,
            mt: { xs: 2, xl: 3 },
          }}
        >
          <Button
            variant="outlined"
            sx={{
              flex: "1",
              borderRadius: "6px",
              mt: { xs: 1, xl: 2 },
              fontSize: { xs: "16px", xl: "20px" },
              fontWeight: "bold",
            }}
            color="inherit"
            onClick={arenaPoolStore.onCloseConfirmModal}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: "1",
              borderRadius: "6px",
              mt: { xs: 1, xl: 2 },
              fontSize: { xs: "16px", xl: "20px" },
              fontWeight: "bold",
            }}
            color="inherit"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </Box>
      </div>
    </ModalC>
  );
});
export default ConfirmModal;