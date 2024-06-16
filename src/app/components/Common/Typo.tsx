"use client";
import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled, SxProps } from "@mui/material/styles";

const TypographyStyle = styled(Typography)(({ theme }) => ({
  "& b": {
    color: "#000",
  },
  ".color-primary": {
    color: "#7645d9",
  },
}));

interface TypoProps {
  size?: string;
  color?: string;
  font?: string;
  lineHeight?: any;
  sx?: SxProps;
  children: React.ReactNode;
  typoProps?: TypographyProps;
}

const styleBySize: any = (size: string) => {
  switch (size) {
    case "h1": {
      return {
        fontSize: { xs: "29px", sm: "34px", lg: "41px", xl: "41px" }, //41
      };
    }
    case "h2": {
      return {
        fontSize: { xs: "18px", sm: "22px", lg: "30px", xl: "30px" }, //30
      };
    }
    case "h3": {
      return {
        fontSize: { xs: "16px", sm: "20px", lg: "22px", xl: "22px" }, // 28
      };
    }
    case "banner-h4": {
      return {
        fontSize: { xs: "14px", sm: "16px", lg: "18px", xl: "20px" }, // 20
      };
    }
    case "h5": //18
      return {
        fontSize: { xs: "15px", sm: "16px", lg: "18px" },
        lineHeight: 1.2,
      };
    case "xl": {
      return {
        fontSize: { xs: "18px", sm: "18px", lg: "20px", xl: "22px" }, // 22
      };
    }
    case "medium": //16px
      return {
        fontSize: { xs: "16px", sm: "16px", xl: "1rem" },
      };
    case "small": // 14px
      return {
        fontSize: "14px",
      };
    case "tiny-small": // 12px
      return {
        fontSize: "12px",
      };

    case "title-tab": // 1px
      return {
        fontSize: { xs: "15px", sm: "16px", xl: "18px" },
        fontWeight: "bold",
        textTransform: "capitalize",
      };
    default:
      return {
        fontSize: "inherit",
      };
  }
};

const styleByColor = (color: string) => {
  switch (color) {
    case "primary": {
      return { color: "#7645d9" };
    }
    case "orange": {
      return { color: "#f39c0b" };
    }
    case "gray":
      return { color: "#6f6f70" };
    case "green": {
      return { color: "#55c200" };
    }
    case "success": {
      return { color: "#28a745" };
    }
    case "error": {
      return { color: "#dc3545" };
    }
    case "black":
      return { color: "#000" };
    case "white":
      return { color: "#fff" };
    default:
      return { color };
  }
};

const styleByFont = (font: string) => {
  switch (font) {
    case "light":
      return { fontWeight: 300 };
    case "normal":
      return { fontWeight: 400 };
    case "medium":
      return { fontWeight: 500 };
    case "semibold":
      return { fontWeight: 600 };
    case "bold":
      return { fontWeight: 700 };
    case "extrabold":
      return { fontWeight: 800 };
    default:
      return {};
  }
};

const TypoC = ({
  children,
  sx,
  size,
  color,
  font,
  lineHeight,
  typoProps,
}: TypoProps) => {
  const styleSize = styleBySize(size);
  const styleColor = styleByColor(color);
  const styleFont = styleByFont(font); //font size

  return (
    <TypographyStyle
      sx={{
        ...styleFont,
        ...styleSize,
        ...styleColor,
        lineHeight: lineHeight || 1.5,
        ...sx,
      }}
      {...typoProps}
    >
      {children}
    </TypographyStyle>
  );
};

export default TypoC;
