"use client";
import React, { useEffect, useMemo } from "react";
import { Container, Box, Card } from "@mui/material";
import MinNft from "@/app/(main)/arena-pools/[slug]/components/MintNft";
import CardContent from "@/app/components/Common/CardContent";
import OverviewToken from "@/app/components/OverviewToken";
import useArenaPool from "@/hooks/useArenaPool";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";

const ProofOfHoldingDetail = observer(
  ({ params }: { params: { slug: string } }) => {
    const {
      root: { providerStore },
    } = useStores();
    const { account, activeProvider, activeChainId } = useMemo(
      () => providerStore.providerStatus,
      [providerStore.providerStatus]
    );
    const { arenaPool, isError, isLoading } = useArenaPool(
      params.slug,
      activeChainId
    );

    return (
      <Container
        maxWidth="xxl"
        sx={{
          pt: { xs: 12, md: 18, lg: 17, xl: 17 },
          pb: 10,
        }}
      >
        <OverviewToken arenaPool={arenaPool} isLoading={isLoading}/>
      </Container>
    );
  }
);

export default ProofOfHoldingDetail;
