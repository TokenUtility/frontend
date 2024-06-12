import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Box, SxProps } from "@mui/material";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";

const ShareLinkRef = observer((props: {
  titleSxProps?: SxProps;
  wrapImageSxProps?: SxProps;
  imageSize?: number;
})  => {

  const { root: {userStore} } = useStores();
  const imageSize = props.imageSize || 38;
  const linkShare = `${process.env.NEXT_PUBLIC_SITE_URL}/?ref=${userStore.profile.referralCode}`;
  const shareFacebook = `https://www.facebook.com/dialog/share?app_id=${process.env.NEXT_PUBLIC_FB_APP_ID}&display=page&href=${linkShare}`;
  const shareTwitter = `http://www.twitter.com/share?url=${linkShare}`;
  const shareTelegram = `https://t.me/share/url?url=${linkShare}&text=textshare`;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography
        sx={{ fontSize: "16px", fontWeight: "bold", ...props.titleSxProps }}
      >
        Share via social media
      </Typography>
      <Box
        className={"social-icons"}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "unset" },
          columnGap: 1,
          color: "#a8a8aa",
          ...props.wrapImageSxProps,
        }}
      >
        <a
          href={shareFacebook}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/images/socials/facebook.svg"
            alt="facebook"
            width={imageSize}
            height={imageSize}
          ></Image>
        </a>
        <a
          href={shareTwitter}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/images/socials/twitter.svg"
            alt="twitter"
            width={imageSize}
            height={imageSize}
          ></Image>
        </a>
        <a
          href={shareTelegram}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/images/socials/telegram.svg"
            alt="telegram"
            width={imageSize}
            height={imageSize}
          ></Image>
        </a>
        {/* <a
          href="https://medium.com/@tokenutility.io/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/images/socials/medium.svg"
            alt="medium"
            width={imageSize}
            height={imageSize}
          ></Image>
        </a> */}
        {/* <a
          href="https://www.instagram.com/tokenutility.io/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/images/socials/instagram.svg"
            alt="instagram"
            width={imageSize}
            height={imageSize}
          ></Image>
        </a> */}
      </Box>
    </Box>
  );
})


export default  ShareLinkRef