import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import JoinOurCommunity from "@/app/components/JoinOurCommunity";
import { InfoSection } from "@/app/components/Home/HowWorks";
import ImageBg from "@/assets/images/bg-coming-soon.webp";

const ComingSoon = () => {
  return (
    <Box
      className="coming-soon"
      sx={{
        position: "relative",
        background: "#1d1d1d",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box
          sx={{
            width: { xs: "100%", md: "calc(50% + 9vh)" },
            pt: { xs: 3, md: 3 },
            pb: { xs: 6, md: 3 },
            pl: { xs: 2, md: 3, lg: 4 },
            pr: { xs: 2, lg: 0 },
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            minHeight: { xs: "auto", md: "100vh" },
            justifyContent: { xs: "flex-start", md: "flex-end" },
          }}
        >
          <Box sx={{ maxWidth: "800px" }}>
            <Box
              sx={{
                mb: { xs: 5, lg: 4, xl: 7 },
                position: { xs: "absolute", md: "unset" },
                top: { xs: "24px", md: "unset" },
              }}
            >
              <Image
                src="/images/logo.svg"
                priority={true}
                width={180}
                height={61}
                alt="logo"
              ></Image>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "38px", sm: "50px", lg: "72px", xl: "76px" },
                fontWeight: "bold",
              }}
            >
              Coming Soon
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "18px", lg: "22px", xl: "24px" },
                color: "#dadada",
                mt: { xs: 1, md: 0 },
                pr: { lg: 2 },
              }}
            >
              A NFT fundraising platform that allows individuals to raise money
              for different life events such as launching new collections,
              celebrating occasions, or supporting charities.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 3, lg: 2, xl: 3 },
              }}
              className="coming-soon__info-section"
            >
              <InfoSection />
            </Box>

            <Box sx={{ mt: 5 }}>
              <JoinOurCommunity
                titleSxProps={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#a8a8aa",
                  textAlign: { xs: "center", md: "left" },
                }}
                imageSize={50}
              ></JoinOurCommunity>
            </Box>
          </Box>
        </Box>
        {/* image */}
        <Box
          sx={{
            width: { xs: "100%", md: "54%" },
            minHeight: { md: "100vh" },
            position: { xs: "relative", md: "absolute" },
            top: 0,
            right: 0,
            height: "100%",
            order: { xs: -1, md: 1 },
          }}
          className="coming-soon__main"
        >
          {/* image desktop */}
          <Box
            sx={{
              position: { xs: "unset", md: "absolute" },
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              borderLeft: "1px solid #1d1d1d",
              display: { xs: "none", md: "block" },
            }}
          >
            <Image
              src={ImageBg}
              style={{
                height: "100%",
                width: "auto",
              }}
              alt="bg-image"
            ></Image>
          </Box>
          {/* image mobile */}
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              background: `url("/images/bg-coming-soon.webp") center`,
              height: { xs: "300px", sm: "400px" },
              backgroundSize: "contain",
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ComingSoon;
