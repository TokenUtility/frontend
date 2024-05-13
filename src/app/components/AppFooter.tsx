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
        pt: { xs: 7, md: 8.5 },
        pb: { xs: 3, md: 8 },
        minHeight: "300px",
        flexShrink: 0,
      }}
    >
      <Container maxWidth="xl">
        <Box
          className="footer-app"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
            gap: 2,
            maxWidth: "768px",
            ml: "auto",
          }}
        >
          <ul>
            <li>Give Fund</li>
            <ul>
              <li>
                <Link href="/donations" target="_blank">Donations</Link>
              </li>
              <li>
                <Link href="/reward-pool" target="_blank">Reward Pools</Link>
              </li>
              <li>
                <Link href="https://blog.tokenutility.io/" target="_blank">Blog</Link>
              </li>
            </ul>
          </ul>
          <ul>
            <li>My Account</li>
            <ul>
              <li>
                <Link href="/profile" target="_blank">Profile</Link>
              </li>
              <li>
                <Link href="/profile#my-active-projects" target="_blank">
                  My Donation Projects
                </Link>
              </li>
              <li>
                <Link href="/profile#my-contributions" target="_blank">My contributions</Link>
              </li>
            </ul>
          </ul>
          <ul>
            <li>About us</li>
            <ul>
              <li>
                <Link href="#how-it-works" target="_blank">How it works</Link>
              </li>
            </ul>
          </ul>
          <Box
            sx={{
              mt: { xs: 2, md: 0 },
              gridColumn: { xs: "1/-1", md: "unset" },
              margin: "auto",
            }}
          >
            <JoinOurCommunity />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
