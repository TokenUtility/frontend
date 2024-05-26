"use client";
import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import Button from "@/app/components/Common/Button";
import { useStores } from "@/contexts/storesContext";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useSearchParams, redirect } from "next/navigation";
import { getCookie } from "@/utils/helpers";
import { ConnectButton, useWallet, addressEllipsis } from "@suiet/wallet-kit";

const Login = observer(() => {
  const {
    root: { dropdownStore, providerStore, userStore },
  } = useStores();
  const [loading, setLoading] = useState<boolean>(false);
  const { providerStatus } = providerStore;
  const { handleLoginWallet } = userStore;
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const authData = getCookie("auth_data")
    ? JSON.parse(getCookie("auth_data"))
    : "";
  const { accessToken } = authData;

  useEffect(() => {
    if (providerStatus.account && userStore.profile.address && accessToken) {
      redirect(from || "/");
    }
  }, [providerStatus.account, userStore.profile.address, from, accessToken]);

  const toggleWalletDropdown = async () => {
    dropdownStore.toggleWalletDropdown();
  };

  async function loginWithWallet() {
    setLoading(true);
    handleLoginWallet()
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Box
        component="main"
        sx={{
          pt: 18,
          pb: 8.5,
          maxWidth: "915px",
          margin: "auto",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {providerStatus.account && !accessToken ? (
          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: "bold", width: { xs: "250px" } }}
            onClick={loginWithWallet}
            loading={loading}
          >
            Login with wallet
          </Button>
        ) : (
          <ConnectButton label="Connect Wallet" />
        )}
      </Box>
    </Container>
  );
});

export default Login;
