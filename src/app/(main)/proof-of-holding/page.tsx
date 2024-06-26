"use client";
import ProofOfHolding from "./ProofOfHolding";
import { Container, Box, Card } from "@mui/material";
import MinNft from "@/app/(main)/proof-of-holding/components/MintNft";
import CardContent from "@/app/components/Common/CardContent";

function ProofOfHoldingPage() {
  return (
    <Container
      maxWidth="xxl"
      sx={{
        pt: { xs: 12, md: 18, lg: 17, xl: 17 },
        pb: 10,
      }}
    >
      <ProofOfHolding />

      <Card sx={{ mt: 5, border: "solid 1px #eee" }}>
        <CardContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(314px, 1fr))",
              gap: { xs: "16px", xl: "24px" },
            }}
          >
            <MinNft />
            <MinNft />
            <MinNft />
            <MinNft />
            <MinNft />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProofOfHoldingPage;
