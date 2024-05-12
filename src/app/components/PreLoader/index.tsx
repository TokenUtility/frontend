"use client";
import React from "react";
import styled from "@emotion/styled";

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
  return <StyledDots>Loading</StyledDots>;
};

export default PreLoader;
