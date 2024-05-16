"use client";
import React from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Image from "next/image";

// styles
export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: ".";
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
`;

const StyledDots = styled(Dots)`
  font-size: 1.35em;
  letter-spacing: 3px;
  color: rgba(0,0,0,0.87);
`;
 
const PreLoader = () => {
  return <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
  <Image
    src="/images/logo-mobile.svg"
    priority={true}
    width={70}
    height={70}
    alt="logo"
    style={{paddingBottom: '10px'}}
  />
  <StyledDots>Loading</StyledDots>
</Box>;
};

export default PreLoader;
