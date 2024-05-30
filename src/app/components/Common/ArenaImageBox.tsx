import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { PoolType } from "@/utils/types";

const ArenaImageBox = ({
  type,
  sizeImage,
  children,
}: {
  type: PoolType;
  sizeImage: number;
  children: React.ReactNode;
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Image
        src={`/images/pool/arena-x${type}.png`}
        height={sizeImage}
        width={sizeImage}
        alt="img"
      />
      <span style={{ color: "#7645d9", fontWeight: "bold" }}>{children}</span>
    </Box>
  );
};

export default ArenaImageBox;
