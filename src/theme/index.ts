"use client";
import { createTheme, Theme, Components } from "@mui/material/styles";

export const HeightsConfig = {
  LARGE: { xl: 58, lg: 56, xs: 52 },
  MEDIUM: 48,
  SMALL: 38,
};

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

const MEDIA_WIDTHS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
  xxl: 1800,
};

const components: Components<Omit<Theme, "components">> = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundImage: "unset",
        boxShadow: "unset",
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        overflowY: "unset",
        overflowX: "unset",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        fontSize: "1rem",
        boxShadow: "unset",
        textTransform: "unset",
        lineHeight: 1.3,
        fontWeight: "bold",
        "&:hover": {
          boxShadow: "unset",
        }
      },
      sizeSmall: {
        borderRadius: "7px",
        padding: "6px 14px",
      },
      sizeMedium: {
        textTransform: "unset",
        padding: "8px 16px",
        borderRadius: "10px",
        minHeight: HeightsConfig.MEDIUM,
      },
      sizeLarge: {
        minHeight: HeightsConfig.LARGE.xs,
        padding: "8px 14px",
        borderRadius: "10px",
        "@media screen and (min-width: 600px)": {
          padding: "15px 36px",
          minHeight: HeightsConfig.LARGE.xs,
        },
        "@media screen and (min-width: 900px)": {
          padding: "12px 36px",
          minHeight: HeightsConfig.LARGE.lg,
        },
        "@media screen and (min-width: 1600px)": {
          padding: "12px 36px",
          minHeight: HeightsConfig.LARGE.xl,
        },
      },
      containedSecondary: {
        "&.MuiButton-sizeLarge": {
          fontWeight: "bold",
        },
        backgroundImage:
          "linear-gradient(270deg, rgba(254,150,47,1) 0%, rgba(253,166,32,1) 20%, rgba(221,123,174,1) 71%, rgba(155,116,241,1) 100%)",
        "&:hover": {
          boxShadow: "none",
          backgroundImage:
            "linear-gradient(270deg, rgba(254,150,47,1) 0%, rgba(253,166,32,1) 20%, rgba(221,123,174,1) 71%, rgba(155,116,241,1) 100%)",
        },
      },
      // # for home page
      outlinedPrimary: {
        backgroundColor: "#7645d9",
        color: "#fff",
        "&.MuiButton-sizeLarge": {
          fontWeight: "bold",
        },
        border: "2px solid #fff",
        "&:hover": {
          border: "2px solid #fff",
          backgroundColor: "#7645d9",
        },
      },

      containedInfo: {
        backgroundColor: "#f6f6f6",
        borderRadius: "10px",
        color: "#7645d9",
        fontWeight: "bold",
        "&:hover": {
          boxShadow: "none",
          backgroundColor: "rgba(0,0,0,0.08)",
        },
      },
      containedInherit: {
        backgroundColor: "rgba(0, 0, 0, 0.87)",
        borderRadius: "10px",
        color: "#fff",
        fontWeight: "bold",
        "&:hover": {
          boxShadow: "none",
          backgroundColor: "rgba(0, 0, 0, 0.80)",
        },
      }
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      determinate: {
        backgroundColor: "rgba(254,180,45,.16 )",
        borderRadius: "9px",
      },
      bar1Determinate: {
        backgroundColor: "#feb42d",
        borderRadius: "9px",
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundImage: "unset",
        backgroundColor: "#faf9fa",
        boxShadow: "unset",
        borderRadius: "27px",
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        backgroundColor: "#f6f6f6",
        borderRadius: "10px",
        minHeight: "62px",
        border: "1px solid transparent",
        "&::before, &::after": {
          display: "none",
        },
        "&.MuiInputBase-multiline": {
          padding: "16px 0px 8px",
        },
        "&.MuiInputBase-adornedStart": {
          paddingLeft: "10px",
          fontSize: "16px",
          color: "#000",
          fontWeight: "bold",
          ".MuiFilledInput-input": {
            paddingLeft: "0 !important",
          },
          "@media screen and (min-width: 900px)": {
            fontSize: "18px",
            paddingLeft: "16px",
            paddingRight: "28px",
          },
        },
        "&.MuiInputBase-adornedEnd": {
          paddingRight: "16px",
          "@media screen and (min-width: 1536px)": {
            paddingRight: "24px",
          },
        },
        "&.Mui-error": {
          border: "1px solid #e84849",
        },
      },
      input: {
        padding: "16px 16px 16px 20px",
        fontSize: "16px",
        color: "#000",
        fontWeight: "bold",
        minHeight: "40px !important",
        display: "flex",
        alignItems: "center",
        "@media screen and (min-width: 900px)": {
          fontSize: "16px",
          padding: "10px 2rem 10px 1.5rem !important",
        },
        "@media screen and (min-width: 1536px)": {
          padding: "10px 2rem 10px 1.5rem !important",
        },
      },
      inputMultiline: {
        padding: "0 15px 0 15px",
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        position: "unset",
        transform: "unset",

        fontWeight: "bold",
        color: "#fff",
        fontSize: "18px",
        "&.Mui-error": {
          color: "#fff",
        },
        "@media screen and (min-width: 1200px)": {
          fontSize: "20px",
        },
        "@media screen and (min-width: 1536px)": {
          fontSize: "22px",
        },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        fontSize: "18px",
        color: "#d8d8d8",
        lineHeight: 1.2,
        marginLeft: 0,
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {},
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: "#3b3b3b",
        padding: "8px 14px",
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        boxShadow: "unset",
        borderRadius: "27px",
        border: "1px solid #eee",
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        backgroundColor: "#fff",
        transitionDuration: "200ms",
        "&:not(.MuiTableRow-head):hover": {
          backgroundColor: "unset",
        },
      },
      head: {
        backgroundColor: "unset",
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: "unset",
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: "6px",
        // color: '#000',
        // background: '#d8d8d8',
      },
    },
  },
};

const theme = createTheme({
  breakpoints: {
    values: MEDIA_WIDTHS,
  },
  typography: {
    fontFamily: `"Comfortaa Variable", Roboto, Arial`,
  },
  palette: {
    mode: "light",
    background: {
      default: "#fff",
      paper: "#fff",
    },
    primary: {
      main: "#7645d9",
    },
    secondary: {
      main: "#7645d9",
    },
    error: {
      main: "#e84849",
    },
  },
  components: components,
});

export default theme;
