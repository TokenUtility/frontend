import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

const ArenaImageBox = ({
  type,
  sizeImage,
  children,
}: {
  type: "x2" | "x10" | "x100";
  sizeImage: number;
  children: React.ReactNode;
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Image
        src={`/images/pool/arena-${type}.png`}
        height={sizeImage}
        width={sizeImage}
        alt="img"
      />
      <span style={{ color: "#7645d9" }}>{children}</span>
    </Box>
  );
};

export default ArenaImageBox
