import { ReactNode, useState, useEffect } from "react";
import {
  Box,
  Divider,
  FormControl,
  FilledInput,
  InputLabel,
  Button,
} from "@mui/material";
import Image from "next/image";
import { useStores } from "@/contexts/storesContext";
import { observer } from "mobx-react";
import useCopyClipboard from "@/hooks/useCopyClipboard";
import { usePathname } from "next/navigation";
import TypoC from "@/app/components/Common/Typo";
import ScreenMedia from "@/app/components/Common/ScreenMedia";

interface ItemShareProps {
  text?: string;
  urlIcon: string;
}
interface ShareBoxProps {
  title: string;
  renderCopyLink?: (a: string, b: string) => string;
}

const SOCIAL_SHARE: { [ket: string]: ItemShareProps } = {
  facebook: { urlIcon: "/images/socials/facebook.svg", text: "Facebook" },
  twitter: { urlIcon: "/images/socials/twitter.svg", text: "Twitter" },
  telegram: { urlIcon: "/images/socials/telegram.svg", text: "Telegram" },
};

const ItemShare = ({
  children,
  urlIcon,
  shareLink,
}: {
  children: ReactNode;
  urlIcon: string;
  shareLink?: string;
}) => {
  return (
    <a href={shareLink} target="_blank" style={{ textDecoration: "none" }}>
      <Box
        sx={{
          cursor: "pointer",
          "&:hover img": { backdropFilter: "contrast(0.8)" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ScreenMedia>
          {({ xlAndUp }) => {
            return (
              <Image
                src={urlIcon}
                height={xlAndUp ? 100 : 70}
                width={xlAndUp ? 100 : 70}
                alt={"twitter-share"}
              />
            );
          }}
        </ScreenMedia>
        <TypoC
          size="medium-large"
          color="label2"
          typoProps={{ align: "center" }}
          sx={{
            marginTop: {
              sm: "4px",
              xl: "8px",
            },
          }}
        >
          {children}
        </TypoC>
      </Box>
    </a>
  );
};

const ShareBox = observer((props: ShareBoxProps) => {
  const {
    root: { appStore },
  } = useStores();
  const [isCopied, setCopied] = useCopyClipboard();
  const [baseUrl, setBaseUrl] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const baseUrl = window.location.origin;

    setBaseUrl(baseUrl);
  }, [pathname]);

  const linkShare = props.renderCopyLink(baseUrl, pathname);

  const shareFacebook = `https://www.facebook.com/dialog/share?app_id=${process.env.NEXT_PUBLIC_FB_APP_ID}&display=page&href=${linkShare}`;
  const shareTwitter = `http://www.twitter.com/share?url=${linkShare}`;
  const shareTelegram = `https://t.me/share/url?url=${linkShare}&text=textshare`;
  return (
    <div>
      <TypoC size="title-modal" font="bold">
        {props.title}
      </TypoC>
      <TypoC
        size="medium-large"
        color="label2"
        lineHeight={1.4}
        sx={{
          mt: { xs: 2, xl: 3 },
        }}
      >
        Ask your friends/community to help you share. Fundraisers shared on
        social networks raise up to 5x more.
      </TypoC>
      <Box
        sx={{
          mt: { xs: 2, md: 3, xl: 4 },
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <ItemShare
          urlIcon={SOCIAL_SHARE["facebook"].urlIcon}
          shareLink={shareFacebook}
        >
          {SOCIAL_SHARE["facebook"].text}
        </ItemShare>
        <ItemShare
          urlIcon={SOCIAL_SHARE["twitter"].urlIcon}
          shareLink={shareTwitter}
        >
          {SOCIAL_SHARE["twitter"].text}
        </ItemShare>
        <ItemShare
          urlIcon={SOCIAL_SHARE["telegram"].urlIcon}
          shareLink={shareTelegram}
        >
          {SOCIAL_SHARE["telegram"].text}
        </ItemShare>
      </Box>
      <Divider color="#6f6f70" sx={{ mt: { xs: 3, xl: 5 }, mb: 0.8 }}></Divider>
      <FormControl sx={{ mt: { xs: 1, xl: 2 } }} fullWidth={true}>
        <InputLabel shrink={true} sx={{ fontSize: { xs: "18px", xl: "20px" } }}>
          Fundraiser link
        </InputLabel>
        <Box sx={{ display: "flex", mt: { xs: 1, xl: 2 }, width: "100%" }}>
          <FilledInput
            value={linkShare}
            readOnly={true}
            inputProps={{
              sx: {
                color: "#a5a6a7",
                fontSize: { xs: "12px", lg: "16px", xl: "22px" },
              },
            }}
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            sx={{
              ml: { xs: 2, xl: 2 },
              width: { md: "100px" },
              fontSize: { xs: "18px", xl: "20px" },
            }}
            color="primary"
            size="large"
            onClick={() => setCopied(linkShare)}
          >
            {isCopied ? "Copied" : "Copy"}
          </Button>
        </Box>
        <TypoC
          size="label"
          color="label2"
          sx={{
            mt: { xs: 2, xl: 4 },
          }}
        >
          Tips: Paste this fundraiser link anywhere.
        </TypoC>
      </FormControl>
    </div>
  );
});
export default ShareBox;
