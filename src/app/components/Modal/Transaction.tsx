"use client";
import { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import ModalC from "@/app/components/Modal";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";
import { Dots } from "@/app/components/PreLoader";
import { TransferLinkAddress } from "@/app/components/Common/TransferLink";
import TypoC from "@/app/components/Common/Typo";
import Link from "next/link";

const TransactionResult = observer(({isSuccess}) => {
  const {
    root: { appStore },
  } = useStores();

  return (
    <Box sx={{ textAlign: "center" }}>
      <TypoC size="h3" font="bold" color={isSuccess ? "success" : "error"}>
        {isSuccess ? 'SUCCESS' : 'FAILURE'}
      </TypoC>
      <Box
        sx={{
          mt: { xs: 2, lg: 3, xl: 4 },
          mb: "12px",
        }}
      >
        <TypoC size="label" font="medium" sx={{ mt: 3, mb: 1 }}>
          {appStore.transactionModalOption.desc}
        </TypoC>
        <TypoC
          size="label"
          font="bold"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Digest: &nbsp;
          <TransferLinkAddress
            address={appStore.transactionBlock}
            type="transaction"
          />
        </TypoC>
        {appStore.transactionModalOption.bottom ? (
          appStore.transactionModalOption.bottom
        ) : (
          <Button
            variant="contained"
            sx={{
              width: "1",
              borderRadius: "6px",
              fontSize: { xs: "16px", xl: "20px" },
              maxWidth: "250px",
              mx: "auto",
              fontWeight: "bold",
              mt: 3,
            }}
            color="inherit"
            size="large"
            fullWidth={true}
            onClick={appStore.onCloseTransactionModal}
          >
            Confirm
          </Button>
        )}
        {appStore.transactionModalOption.buttonLink ? (
          <Link href={appStore.transactionModalOption.buttonLink.href}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "6px",
                mt: { xs: 2, sm: 3, xl: 4 },
                fontSize: { xs: "16px", sm: "18px", xl: "20px" },
                maxWidth: "350px",
                fontWeight: "bold",
              }}
              fullWidth={true}
              color="primary"
              size="large"
              onClick={appStore.onCloseTransactionModal}
            >
              {appStore.transactionModalOption.buttonLink.text}
            </Button>
          </Link>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
});

const TransactionLoading = (props) => {
  return (
    <Box sx={{ textAlign: "center", mt: 3, mb: 3 }}>
      <TypoC size="title-modal-small" font="bold">
        <Dots>Confirming Transaction</Dots>
      </TypoC>

      <TypoC
        size="label"
        font="medium"
        lineHeight={1.2}
        sx={{ mt: 1.5, display: "flex", justifyContent: "center" }}
      >
        Digest: &nbsp;
        <TransferLinkAddress
          address={props?.txResponse}
          type="transaction"
        />
      </TypoC>
    </Box>
  );
};

interface ExecutionStatus {
  error?: string;
  status: "success" | "failure";
}
const TransactionModal = observer(() => {
  const {
    root: { appStore, notificationStore, providerStore },
  } = useStores();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (appStore.transactionBlock) {
      providerStore.providerStatus.activeProvider
        .waitForTransactionBlock({
          digest: appStore.transactionBlock,
          options: {
            showEffects: true,
          },
        })
        .then((result) => {
          console.log({result})
          if (result.effects?.status.status === "success") {
            setIsSuccess(true)
            return result;
          } else {
            throw Error(result.effects?.status.error);
          }
        })
        .catch((error) => {
          console.log({ error });
          notificationStore.showErrorNotification(
            "Tx failed, please try again!"
          );
          setIsSuccess(false)
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStore.transactionModal]);

  return (
    <ModalC
      open={appStore.transactionModal}
      onClose={(event, reason) =>
        reason !== "backdropClick" && appStore.onCloseTransactionModal()
      }
      aria-labelledby="claim-reward-transaction-modal-title"
      aria-describedby="claim-reward-transaction-modal-description"
      sx={{ maxWidth: { xs: 500, xl: 550 } }}
    >
      {loading ? (
        <TransactionLoading txResponse={appStore.transactionBlock} />
      ) : (
        <TransactionResult isSuccess={isSuccess} />
      )}
    </ModalC>
  );
});
export default TransactionModal;
