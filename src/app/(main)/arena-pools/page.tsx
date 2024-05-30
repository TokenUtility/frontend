"use client";
import ArenaTable from "@/app/components/Home/ArenaTable";
import { Container } from "@mui/material";

export default function ArenaPools() {
  return (
    <main id="home">
      <Container
        maxWidth="xxl"
        sx={{
          pt: { xs: 12, md: 18, lg: 17, xl: 17 },
          pb: 6,
        }}
      >
        <ArenaTable />
      </Container>
    </main>
  );
}
