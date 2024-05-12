"use client";
import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled, SxProps } from "@mui/material/styles";

const TypographyStyle = styled(Typography)(({ theme }) => ({
  "& b": {
    color: "#fff",
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
        fontSize: { xs: "22px", sm: "24px", lg: "30px", xl: "30px" }, //30
      };
    }
    case "h3": {
      return {
        fontSize: { xs: "20px", sm: "24px", lg: "22px", xl: "22px" }, // 28
      };
    }
    case "h4": {
      return {
        fontSize: { xs: "16px", sm: "16px", lg: "18px", xl: "20px" }, // 20
      };
    }
    case "h5": //18
      return {
        fontSize: { xs: "15px", sm: "16px", xl: "18px" },
        lineHeight: 1.2,
      };
    case "medium": //16px
      return {
        fontSize: { xs: "12px", sm: "14px", xl: "1rem" },
      };
    case "small": // 15px
      return {
        fontSize: "14px",
      };
    case "tiny-small": // 1px
      return {
        fontSize: "11px",
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
      return { color: "#ffab00" };
    }
    case "gray":
      return { color: "#6f6f70" };
    case "green": {
      return { color: "#55c200" };
    }
    case "black":
      return { color: "#000" };
    case "white":
      return { color: "#fff" };
    default:
      return {};
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
