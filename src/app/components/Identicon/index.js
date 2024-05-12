"use client";
import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Jazzicon from "jazzicon";
import { useStores } from "@/contexts/storesContext";

const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  margin-right: 4px;
  background-color: #565a69;
`;

export default function Identicon() {
  const ref = useRef();
  const {
    root: { providerStore },
  } = useStores();
  const account = providerStore.providerStatus.account;

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
    }
  });

  return <StyledIdenticon ref={ref} />;
}
