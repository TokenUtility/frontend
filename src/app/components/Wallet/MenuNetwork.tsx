import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, Box, MenuItem } from "@mui/material";
import Menu, { MenuProps } from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useStores } from "@/contexts/storesContext";
import { observer } from "mobx-react";
import { SUPPORTED_CHAINS } from "@/provider/connectors";
import { getNetworkConfigs } from "@/provider/networks";
import Image from "next/image";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.grey[300],
    backgroundColor: "#1e1e1e",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "10px 0",
    },
    "& .MuiMenuItem-root": {
      paddingTop: "8px",
      paddingBottom: "8px",
    },
  },
}));

const MenuNetwork = observer(() => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {
    root: { providerStore },
  } = useStores();
  const { activeChainId, injectedActive, injectedLoaded } =
    providerStore.providerStatus;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchNetwork = async (chainId) => {
    // @ts-ignore
    const provider = window.ethereum;
    if (provider) {
      // const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10);
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${getNetworkConfigs(chainId).chainId.toString(16)}`,
              chainName: getNetworkConfigs(chainId).name,
              nativeCurrency: getNetworkConfigs(chainId).nativeCurrency,
              rpcUrls: getNetworkConfigs(chainId).rpcUrls,
              blockExplorerUrls: [getNetworkConfigs(chainId).blockExplorer.url],
            },
          ],
        });
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: `0x${getNetworkConfigs(chainId).chainId.toString(16)}`,
            },
          ],
        });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      providerStore.setActiveChainId(chainId);
    }
  };

  function switchChain(chainId) {
    switchNetwork(chainId);
    handleClose();
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          height: "100%",
          py: 0,
          px: 1.5,
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#fdede91a",
          },
          fontWeight: 400,
          lineHeight: 1.2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
          <Image src={getNetworkConfigs()?.icon} height="32" width="32" alt="" />
          {/* &nbsp;
          {getNetworkConfigs(activeChainId).name} */}
        </Box>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {SUPPORTED_CHAINS.map((chainId) => (
          <MenuItem
            key={chainId}
            onClick={() => switchChain(chainId)}
            disableRipple
          >
            <Box
              sx={{ display: "flex", alignItems: "center", fontSize: "16px" }}
            >
              <Image
                src={getNetworkConfigs(chainId).icon}
                height="24"
                width="24"
                alt=""
              ></Image>{" "}
              &nbsp;&nbsp;
              {getNetworkConfigs(chainId).name}
            </Box>
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
});

export default MenuNetwork;
