import { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import TypoC from "@/app/components/Common/Typo";
import Link from "next/link";
import UserIcon from "@/app/components/Common/Icons/Profile";
import TextValidator from "@/app/components/InputValidator/TextField";
import { ValidatorForm } from "react-form-validator-core";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import useCopyClipboard from "@/hooks/useCopyClipboard";
import ShareLinkRef from "./components/ShareLinkRef";
import MyRevenueSharing from "./components/MyRevenueSharing";
import { listToken } from "@/configs";
import ChainIcon from "@/app/components/Common/ChainIcon";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";
import ScreenMedia from "@/app/components/Common/ScreenMedia";

const LeftSideBar = () => {
  return (
    <Box
      sx={{
        borderRadius: "27px",
        border: "solid 1px #eee",
        padding: "24px",
      }}
    >
      <TypoC size="h5" font="bold">
        Total Friends Referred
      </TypoC>
      <TypoC size="h5" font="bold" sx={{ mt: 2, textAlign: "center" }}>
        52
      </TypoC>
      <Divider sx={{ mt: 2 }}></Divider>
      <TypoC size="h5" font="bold" sx={{ mt: 2 }}>
        Commission Rewards
      </TypoC>
      <TypoC size="h5" font="bold" sx={{ mt: 2, textAlign: "center" }}>
        ≈ $115.8
      </TypoC>
      <Box sx={{ mt: 4 }}>
        <TableContainer
          sx={{ border: "none", p: 0, margin: "margin: 0 -16px" }}
        >
          <Table
            sx={{
              borderCollapse: "separate",
              borderSpacing: "0px 8px",
            }}
            aria-label="active pool table"
          >
            <TableBody>
              {listToken.map((token, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" sx={{ py: 0.6 }}>
                      {" "}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <ChainIcon
                          src={token.logo}
                          alt="sui-logo"
                          size={32}
                          disabledResponsive={true}
                        />
                        <TypoC font="bold">{token.name}</TypoC>
                      </Box>
                    </TableCell>
                    <TableCell component="th" scope="row" sx={{ py: 0.6 }}>
                      <Box>
                        <TypoC font="bold">+ 120 Sui</TypoC>
                        <TypoC font="bold" size="tiny-small" color="gray">
                          19.2 $
                        </TypoC>
                      </Box>
                    </TableCell>
                    <TableCell component="th" scope="row" sx={{ py: 0.6 }}>
                      <TypoC color="primary" font="bold" size="title-small">
                        <Link href={"#"}>Claim Now</Link>
                      </TypoC>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export const RevenueSharingInfo = () => {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.22)",
        px: 3,
        py: 3,
        mt: 3,
        display: "flex",
        gap: 3,
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Box>
        <TypoC size="h5" font="bold">
          Invite a friend to get Revenue Sharing
        </TypoC>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <UserIcon size="22px" color="#000" />
          <Box>
            <TypoC color="black">Normal User</TypoC>
            <TypoC size="xl" sx={{ mt: 1 }} lineHeight={1.1}>
              10%
            </TypoC>
            <TypoC size="small">Revenue Sharing</TypoC>
          </Box>
        </Box>
      </Box>

      <ScreenMedia>
        {({ lgAndUp }) => {
          return (
            <Divider
              color="#d8d8d8"
              orientation={lgAndUp ? "vertical" : "horizontal"}
              sx={{ height: "unset" }}
            />
          );
        }}
      </ScreenMedia>
      <Box sx={{ flex: 1 }}>
        <TypoC size="h5" font="bold">
          Whitelist your Address to Upgrade from normal user to:
        </TypoC>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
            justifyContent: "space-between",
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <UserIcon size="22px" color="#7645d9" />
              <Box>
                <TypoC color="primary">Strategic partner</TypoC>
                <TypoC size="xl" sx={{ mt: 1 }} lineHeight={1.1}>
                  50%
                </TypoC>
                <TypoC size="small">Revenue Sharing</TypoC>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <UserIcon size="22px" color="#f39c0b" />
              <Box>
                <TypoC color="orange">Early supporter</TypoC>
                <TypoC size="xl" sx={{ mt: 1 }} lineHeight={1.1}>
                  70%
                </TypoC>
                <TypoC size="small">Revenue Sharing</TypoC>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              fontWeight: "bold",
              marginLeft: "auto",
            }}
          >
            <Link href="/profile#revenue-sharing">Check it out</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const FormLinkRef = observer(() => {
  const [isCopied, setCopied] = useCopyClipboard();
  const [revenueSharingLink, setRevenueSharingLink] = useState("");
  const {
    root: { userStore },
  } = useStores();

  function handleShareLinkChange(event: ChangeEvent<HTMLInputElement>) {
    setRevenueSharingLink(event.target.value);
  }

  const handleSubmit = () => {
    userStore.updateAccountReferralCode(revenueSharingLink).catch(() => {});
  };

  return (
    <ValidatorForm
      onSubmit={handleSubmit}
      onError={(errors) => {
        // setErrorForm(true);
        console.log(errors);
      }}
      autoComplete="off"
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }} className="share-link-input">
          <TypoC font="bold">Revenue Sharing Link</TypoC>
          {/* @ts-ignore */}
          <TextValidator
            id="shareLink"
            name="shareLink"
            type="text"
            value={userStore.profile?.referralCode || ""}
            placeholder="revenuesharingcode"
            startAdornment={process.env.NEXT_PUBLIC_SITE_URL + "/"}
            endAdornment={
              <Tooltip title={isCopied ? "Copied" : "Copy"}>
                <IconButton
                  onClick={() =>
                    setCopied(
                      `${process.env.NEXT_PUBLIC_SITE_URL}\/${userStore.profile?.referralCode}`
                    )
                  }
                >
                  <ContentCopyOutlinedIcon style={{ color: "#000" }} />
                </IconButton>
              </Tooltip>
            }
            FormHelperTextProps={{ sx: { mt: 1 } }}
            FormControlProps={{ sx: { mt: 0 } }}
            disabled
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: userStore.profile?.referralCode ? "none" : "block",
          }}
        >
          <TypoC font="bold">Enter Revenue Sharing Code</TypoC>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              gap: 2,
              alignItems: "stretch",
            }}
          >
            <Box sx={{ flex: 1 }}>
              {/* @ts-ignore */}
              <TextValidator
                id="shareLink"
                onChange={handleShareLinkChange}
                name="shareLink"
                type="text"
                value={revenueSharingLink || ""}
                placeholder="Revenue Sharing Code"
                FormHelperTextProps={{ sx: { mt: 1 } }}
                FormControlProps={{ sx: { mt: 0, flex: 1 } }}
                styleInput={{ mt: 0 }}
                fullWidth={true}
              />
            </Box>
            <Button
              variant="outlined"
              color="inherit"
              type="submit"
              size="large"
            >
              Apply
            </Button>
          </Box>
          <TypoC sx={{ mt: 1 }} size="tiny-small">
            Once the code has been created, it is not possible to make edits.
          </TypoC>
        </Box>
      </Box>
    </ValidatorForm>
  );
});

const RevenueSharing = () => {
  return (
    <Box sx={{ display: "flex", gap: { xs: 2, xl: 3 } }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, xl: 3 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            borderRadius: "27px",
            border: "solid 1px #eee",
            padding: "24px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TypoC size="xl" font="bold">
              INVITE A FRIEND TO GET:
            </TypoC>
            <TypoC color="primary" font="bold">
              <Link href="#">Revenue Sharing Terms & Conditions</Link>
            </TypoC>
          </Box>
          <TypoC size="h5" font="bold" sx={{ mt: 3 }}>
            10% Revenue Sharing for Normal user
          </TypoC>
          <TypoC size="h5" sx={{ mt: 1 }}>
            Get 10% Revenue Sharing for each friend you invite when they join
            Arena pools.
          </TypoC>
          <Box
            sx={{
              borderRadius: "10px",
              boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.22)",
              px: 3,
              py: 3,
              mt: 3,
            }}
          >
            <TypoC size="h5" font="bold">
              Whitelist your Address to Upgrade from normal user to:
            </TypoC>
            <Box
              sx={{
                mt: 2.5,
                display: "flex",
                gap: 1,
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", gap: 4 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <UserIcon size="22px" color="#7645d9" />
                  <Box>
                    <TypoC color="primary">Strategic partner</TypoC>
                    <TypoC size="xl" sx={{ mt: 1 }} lineHeight={1.1}>
                      50%
                    </TypoC>
                    <TypoC size="small">Revenue Sharing</TypoC>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <UserIcon size="22px" color="#f39c0b" />
                  <Box>
                    <TypoC color="orange">Early supporter</TypoC>
                    <TypoC size="xl" sx={{ mt: 1 }} lineHeight={1.1}>
                      70%
                    </TypoC>
                    <TypoC size="small">Revenue Sharing</TypoC>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "300px",
                  alignItems: "flex-end",
                  flex: 1,
                }}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ width: "100%" }}
                >
                  Fill this Form
                </Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <FormLinkRef />
          </Box>
          <ShareLinkRef />
        </Box>
        <MyRevenueSharing />
      </Box>
      <Box sx={{ width: "450px", flexShrink: 0 }}>
        <LeftSideBar />
      </Box>
    </Box>
  );
};

export default RevenueSharing;
