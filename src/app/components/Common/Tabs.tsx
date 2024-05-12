import React from "react";
import { TabPanelProps } from "@/utils/types";
import Box from "@mui/material/Box";

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, id, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${id}-tabpanel-${index}`}
      aria-labelledby={`${id}-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: { xs: 4, xl: 5 } }}>{children}</Box>}
    </div>
  );
}

export function a11yProps(index: number, id: string) {
  return {
    id: `${id}-tab-${index}`,
    "aria-controls": `${id}-tabpanel-${index}`,
  };
}
