"use client";
import { useState, useEffect } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { shortenAddress } from "@/utils";
import { useGetEtherscanLink } from "@/hooks/useEtherscanLink";
import { shortenTransactionHash } from "@/utils/helpers";
interface TransferLinkAddressProps {
  address: string;
  type?: "transaction" | "token" | "address" | "block";
}
export const TransferLinkAddress = (props: TransferLinkAddressProps) => {
  const getEtherscanLink = useGetEtherscanLink();
  const type = props.type || "address";
  const shorten = type === "address" ? shortenAddress : shortenTransactionHash;
  const [href, setHref] = useState("");
  useEffect(() => {
    setHref(getEtherscanLink(props.address || "", type));
  }, [props, type, getEtherscanLink]);


  if (!props.address) {
    return null;
  }
  console.log({shortenTransactionHash: shortenTransactionHash(props.address)})
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
