import * as React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import Container from "@mui/material/Container";
import JoinOurCommunity from "@/app/components/JoinOurCommunity";

export default function ColorInversionFooter() {
  return (
    <Box
      sx={{
        borderTop: "solid 1px rgba(255, 255, 255, 0.15)",
        pt: { xs: 2, md: 0 },
        pb: { xs: 2, md: 3 },
        flexShrink: 0,
      }}
    >
      <Container maxWidth="xl">
        <Box
          className="footer-app"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            maxWidth: "768px",
            ml: "auto",
          }}
        >
          <JoinOurCommunity />
        </Box>
      </Container>
    </Box>
  );
}
