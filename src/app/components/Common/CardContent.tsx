import React from "react";
import { SxProps, Box } from "@mui/material";

export default function CardContent({children, sx}: {children: React.ReactNode, sx?: SxProps}) {
  return (
    <Box sx={{ p: { xs: 2, lg: 3, xl: 3 }, ...sx }}>
      {children}
    </Box>
  );
}
