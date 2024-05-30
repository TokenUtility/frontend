import React from "react";
import { Box, Typography } from "@mui/material";

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
      <Typography
        sx={{
          fontSize: { xs: "24px", sm: "30px", lg: "40px", xl: "40px" },
          fontWeight: "bold",
        }}
      >
       TokenUtility is coming soon.
      </Typography>
    </Box>
  );
};

export default ComingSoon;
