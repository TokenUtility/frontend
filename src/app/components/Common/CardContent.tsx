import Box from "@mui/material/Box";

export default function CardContent({children, sx}) {
  return (
    <Box sx={{ p: { xs: 2, xl: 3, xl: 3 }, ...sx }}>
      {children}
    </Box>
  );
}
