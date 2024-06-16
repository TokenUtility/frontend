import * as React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import Container from "@mui/material/Container";
import JoinOurCommunity from "@/app/components/JoinOurCommunity";
import { title } from "process";
import { url } from "inspector";

const MENU_LINK = [
  {
    title: "How it works",
    url: "https://bit.ly/token-utility-doc",
  },
  { title: "Docs", url: "#" },
];

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
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <ul style={{ display: "flex", fontSize: "16px", gap: "24px" }}>
            {MENU_LINK.map((menu, index) => (
              <li key={index}>
                <Link href={menu.url} target="_blank">
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
          <JoinOurCommunity />
        </Box>
      </Container>
    </Box>
  );
}
