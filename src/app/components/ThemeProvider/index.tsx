"use client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { usePathname } from "next/navigation";

function ThemeApp({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
export default ThemeApp;
