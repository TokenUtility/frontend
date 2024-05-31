import React from "react";
import { Box, Typography } from "@mui/material";
import Link from 'next/link'

const ComingSoon = () => {
  return (
    <Box
      className="coming-soon"
      sx={{
        position: "relative",
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={{textAlign: 'center'}}>
      <Typography
        sx={{
          fontSize: { xs: "24px", sm: "30px", lg: "40px", xl: "40px" },
          fontWeight: "bold",
        }}
      >
        TokenUtility is coming soon.
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: "16px", sm: "18px", lg: "24px", xl: "24px" },
          fontWeight: "bold",
        }}
      ><Link href="/">
          Home
        </Link>
      </Typography>
      </Box>
    </Box>
  );
};

export default ComingSoon;
