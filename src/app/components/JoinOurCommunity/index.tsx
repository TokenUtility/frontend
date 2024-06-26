import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Box, SxProps } from "@mui/material";

export default function JoinOurCommunity(props: {
  titleSxProps?: SxProps;
  wrapImageSxProps?: SxProps;
  imageSize?: number;
}) {
  const imageSize = props.imageSize || 38;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography
        sx={{ fontSize: "18px", fontWeight: "bold", ...props.titleSxProps }}
      >
        Join Our Community
      </Typography>
      <Box
        className={"social-icons"}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "unset" },
          columnGap: 1,
          mt: 1,
          color: "#a8a8aa",
          ...props.wrapImageSxProps,
        }}
      >
        {/* <a
          href="https://www.facebook.com/groups/nftcommunityofficial"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/images/socials/facebook.svg"
            alt="facebook"
            width={imageSize}
            height={imageSize}
          ></Image>
        </a> */}
        <a
          href="https://x.com/tokenutility_io"
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
          href="https://t.me/tokenutility_channel"
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
}
