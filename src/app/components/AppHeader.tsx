"use client";
import { useState, useEffect, MouseEvent } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  MenuItem,
  Menu,
  Container,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Button from "@/app/components/Common/Button";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ProfileIcon from "@/app/components/Common/Icons/Profile";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchIcon from "@mui/icons-material/Search";
import useCheckAuth from "@/hooks/useCheckAuth";
import { getCookie } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";
import Link from "next/link";
import TypoC from "@/app/components/Common/Typo";
import ScreenMedia from "@/app/components/Common/ScreenMedia";
import dynamic from "next/dynamic";
import SearchInput from "@/app/components/Search";
import Device from "@/app/components/Device";
import { useWallet } from "@suiet/wallet-kit";
// import MenuNetwork from "@/app/components/Wallet/MenuNetwork";

const Wallet = dynamic(
  () => {
    return import("@/app/components/Wallet");
  },
  { ssr: false }
);

const ButtonLink = styled(Button)(({ theme }) => ({
  borderBottom: "2px solid transparent",
  borderRadius: "unset",
  transitionDuration: "200ms",
  padding: "6px 0",
  color: "rgba(0, 0, 0, 0.87)",
  "&:hover": {
    color: "#7645d9",
    background: "unset",
    borderColor: "#7645d9",
  },
  "&.active": {
    borderColor: "#7645d9",
  }
}));

const navItems = [
  {
    link: "/#arena-pools",
    text: "Arena Pools",
    target: "",
  },
  {
    link: "/#revenue-sharing",
    text: "Revenue Sharing",
    target: "",
  },
  {
    link: "/#swap",
    text: "Swap",
    target: "",
  },
  {
    link: "/#how-it-works",
    text: "How it works",
    target: "",
  },
];

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "unset",
    color: "#7645d9",
  },
  "&.MuiMenuItem-root": {
    lineHeight: 2,
  },
  paddingLeft: "30px",
  paddingRight: "30px",
}));

type Anchor = "top" | "left" | "bottom" | "right";
const ANCHOR_SEARCH: Anchor = "left";
const ANCHOR_MENU: Anchor = "right";

const HeaderSidebar = () => {
  return (
    <Box sx={{ px: 2, pt: 1.5, pb: 0.5, background: "#0f0f0f" }}>
      <Image
        src="/images/logo.svg"
        priority={true}
        width={180}
        height={61}
        alt="logo"
      />
    </Box>
  );
};

const SearchMobile = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor: Anchor, open: boolean) => () => {
    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <IconButton
          onClick={toggleDrawer(ANCHOR_SEARCH, true)}
          aria-label="Search"
        >
          <SearchIcon fontSize="large" />
        </IconButton>
        <Drawer
          anchor={ANCHOR_SEARCH}
          open={state[ANCHOR_SEARCH]}
          variant="temporary"
          PaperProps={{
            sx: {
              width: "100%",
              background: "#141515",
            },
            onClick: toggleDrawer(ANCHOR_SEARCH, false),
          }}
        >
          <Box role="presentation">
            <HeaderSidebar />
            <Box sx={{ p: 2 }} onClick={(e) => e.stopPropagation()}>
              <List>
                <SearchInput />
              </List>
              <Divider />
            </Box>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

const MenuMobile = observer(() => {
  const {
    root: { providerStore },
  } = useStores();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor: Anchor, open: boolean) => () => {
    setState({ ...state, [anchor]: open });
  };

  const container =
    typeof window !== "undefined" ? window.document.body : undefined;

  return (
    <nav>
      <Button
        variant="outlined"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(ANCHOR_MENU, true)}
        sx={{
          ml: 0,
          px: { xs: 0.2, md: 1 },
          display: { lg: "none" },
          minWidth: "42px",
          height: "42px",
          background: "#514e4e",
        }}
      >
        <MoreHorizRoundedIcon fontSize="large" />
      </Button>
      <Drawer
        anchor={ANCHOR_MENU}
        container={container}
        variant="temporary"
        open={state[ANCHOR_MENU]}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        onClose={toggleDrawer(ANCHOR_MENU, false)}
        PaperProps={{
          sx: {
            width: "100%",
            background: "#141515",
          },
          onClick: toggleDrawer(ANCHOR_MENU, false),
        }}
      >
        <Box
          role="presentation"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            pb: 7,
          }}
        >
          <Box>
            <HeaderSidebar />
            <Box sx={{ p: 2 }}>
              <List>
                {navItems.map((item) => (
                  <ListItem
                    key={item.link}
                    style={{
                      display:
                        item.excludeChain ===
                        providerStore.providerStatus.activeChainId
                          ? "none"
                          : "",
                    }}
                  >
                    <Link
                      href={item.link}
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        marginBottom: "10px",
                      }}
                      target={item.target}
                    >
                      <TypoC size="medium" font="bold">
                        {item.text}
                        {item.target === "_blank" ? (
                          <sup className="sup-link">↗</sup>
                        ) : (
                          ""
                        )}
                      </TypoC>
                    </Link>
                  </ListItem>
                ))}
              </List>
              <Device>
                {({ isMobile }) => {
                  if (isMobile)
                    return (
                      <>
                        <TypoC sx={{ mb: 1 }} font="bold">
                          Connected wallet
                        </TypoC>
                        <Wallet />
                      </>
                    );
                }}
              </Device>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </nav>
  );
});

const ProfileButton = observer(() => {
  const {
    root: { providerStore, userStore },
  } = useStores();
  const { disconnect, connected } = useWallet();
  // const handleAuth = useCheckAuth();
  const isAuth = connected; // providerStore.isConnect && userStore.accessToken;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    // if (!handleAuth({ onlyCheck: false })) {
    //   return;
    // }
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    disconnect();
    userStore.handleLogout();
    handleClose();
  }

  function handleMouseOver(event: MouseEvent<HTMLButtonElement>) {
    if (isAuth) {
      handleClick(event);
    }
  }

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#7646d9",
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(118, 70, 217, 0.5)",
          },
          display: { xs: !isAuth && "none" },
          width: { xs: "44px", md: "unset" },
          height: "44px",
          minWidth: userStore.profile?.avatar ? "44px" : "54px",
          padding: userStore.profile?.avatar ? 0 : "0 12px",
          overflow: "hidden",
        }}
        className="cursor-pointer"
        id="profile-button"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
      >
        <ScreenMedia>
          {({ xsOnly }) =>
            isAuth && userStore.profile?.avatar ? (
              <Box sx={{ display: "flex" }}>
                <Image
                  src={userStore.profile?.avatar}
                  width={44}
                  height={44}
                  alt="avatar"
                />
              </Box>
            ) : (
              <ProfileIcon size={xsOnly ? "24px" : "30px"} />
            )
          }
        </ScreenMedia>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        elevation={0}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionProps={{
          style: { backgroundColor: "transparent" },
        }}
        MenuListProps={{
          "aria-labelledby": "profile-button",
          onMouseLeave: handleClose,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            minWidth: "220px",
            boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.22)",
            borderRadius: "10px",
            padding: "8px 0",
          }}
        >
          <Link
            href="/profile"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <StyledMenuItem onClick={handleClose}>My Profile</StyledMenuItem>
          </Link>
          <Link
            href="/profile"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <StyledMenuItem onClick={handleClose}>My Withdraw</StyledMenuItem>
          </Link>
          <Link
            href="/profile"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <StyledMenuItem onClick={handleClose}>
              Revenue Sharing
            </StyledMenuItem>
          </Link>
          <hr color="#d8d8d8" style={{ height: "1px", border: "none" }} />
          <StyledMenuItem onClick={handleLogout}>
            <LogoutRoundedIcon sx={{ mr: 1 }} /> Logout
          </StyledMenuItem>
        </Box>
      </Menu>
    </>
  );
});

const DrawerAppBar = observer(() => {
  const {
    root: { appStore, userStore, providerStore },
  } = useStores();

  const pathname = usePathname();
  const isPageHome = pathname === "/";
  const [headerPositionStart, setHeaderScrolled] = useState(
    isPageHome ? true : false
  );

  // const smAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  // function listenScrollEvent(e) {
  //   if (!isPageHome) return;
  //   if (window.scrollY > 80) {
  //     setHeaderScrolled(false);
  //   } else {
  //     setHeaderScrolled(true);
  //   }
  // }

  // useEffect(() => {
  //   listenScrollEvent(null);
  //   window.addEventListener("scroll", listenScrollEvent);
  //   return () => {
  //     window.removeEventListener("scroll", listenScrollEvent);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    appStore.setDomain(window?.location.host);
    appStore.setOrigin(window?.location.origin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const authData = getCookie("auth_data")
        ? JSON.parse(getCookie("auth_data"))
        : "";
      const { accessToken } = authData;
      if (
        accessToken &&
        !userStore.accessToken &&
        providerStore.providerStatus.injectedActive
      ) {
        userStore.reLoginByAccessToken(accessToken);
      }
    } catch (e) {
      console.error("Error reLoginByAccessToken: ", e);
      // do nothing
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerStore.providerStatus.injectedActive]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: '#fff',
          transitionDuration: "200ms",
        }}
        className={
          headerPositionStart && isPageHome ? "header-position-start" : ""
        }
      >
        <div id="app-header-content" />
        <Container maxWidth="xxl" sx={{background: "#fff"}}>
          <Toolbar className="c-toolbar">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: { xs: 1, md: 2, lg: 4 } }}>
                  <Link href="/" style={{ display: "flex" }}>
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                      <Image
                        src="/images/logo.svg"
                        width={180}
                        height={61}
                        alt="logo"
                        priority
                      />
                    </Box>
                    <Box sx={{ display: { md: "none" } }}>
                      <Image
                        src="/images/logo-mobile.svg"
                        width={42}
                        height={42}
                        alt="logo"
                        priority
                        className="logo-mobile"
                      />
                    </Box>
                  </Link>
                </Box>
                <SearchMobile />
                <Box sx={{ display: { xs: "none", lg: "block" } }}>
                  {navItems.map((item) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      target={item.target}
                      style={{
                        display:
                          item.excludeChain ===
                          providerStore.providerStatus.activeChainId
                            ? "none"
                            : "",
                      }}
                    >
                      <ButtonLink
                        sx={{ mx: 1.5, fontWeight: 'bold' }}
                        variant="text"
                        className={
                          (pathname === item.link ? "active" : "") +
                          (headerPositionStart && isPageHome ? "" : " light")
                        }
                      >
                        {item.text}
                        {item.target === "_blank" ? (
                          <sup className="sup-link">↗</sup>
                        ) : (
                          ""
                        )}
                      </ButtonLink>
                    </Link>
                  ))}
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: { xs: 1, sm: 1.5 } }}>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Device>
                    {({ isMobile }) => {
                      if (isMobile) return null;
                      return (
                        <Box sx={{ display: "flex", gap: 1.5 }}>
                          <SearchInput />
                          {/* <MenuNetwork /> */}
                          <Wallet />
                        </Box>
                      );
                    }}
                  </Device>
                </Box>
                <ProfileButton />
                <MenuMobile />
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
});

export default DrawerAppBar;
