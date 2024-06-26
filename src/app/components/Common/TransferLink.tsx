"use client";
import { useState, useEffect } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { shortenAddress } from "@/utils";
import { useGetSuiScanLink } from "@/hooks/useEtherscanLink";
import { shortenTransactionHash } from "@/utils/helpers";
interface TransferLinkAddressProps {
  address: string;
  type?: "transaction" | "token" | "address" | "block";
}

export const TransferLinkAddress = (props: TransferLinkAddressProps) => {
  const getSuiScanLink = useGetSuiScanLink();
  const type = props.type || "address";
  const shorten = type === "address" ? shortenAddress : shortenTransactionHash;
  const [href, setHref] = useState("");
  useEffect(() => {
    setHref(getSuiScanLink(props.address || "", type));
  }, [props, type, getSuiScanLink]);


  if (!props.address)  return null;

  return (
    <a
      href={href}
      target="_blank"
      style={{  display: "flex", alignItems: "center" }}
    >
      {shorten(props.address || "")}
      <OpenInNewIcon
        style={{ color: "#7645d9", marginLeft: "6px" }}
        fontSize="small"
      />
    </a>
  );
};
