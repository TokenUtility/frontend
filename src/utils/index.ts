
import { ChainId } from "@/constants";
import { networkConnectors } from "@/provider/networkConnectors";
import { getNetworkConfigs } from "@/provider/networks";
import dayjs from "dayjs";


export function shortenAddress(address: string, chars = 4): string {
  if (!address) {
    return "";
  }
  const parsed = address;
  if (!parsed) {
    // throw Error(`Invalid 'address' parameter '${address}'.`);
    return "";
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(66 - chars)}`;
}

export function getSuiScanLink(
  chainId: ChainId | undefined | number,
  data: string | number,
  type: "transaction" | "token" | "address" | "block" = "address",
): string {

  const cid = chainId ?? networkConnectors.getCurrentChainId();
  const network = getNetworkConfigs(cid);
  const prefix = network?.blockExplorer?.url;

  switch (type) {
    case "transaction": {
      return `${prefix}/tx/${data}`;
    }
    case "token": {
      return `${prefix}/coin/${data}`;
    }
    case "block": {
      return `${prefix}/block/${data}`;
    }
    case "address":
    default: {
      return `${prefix}/account/${data}`;
    }
  }
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

/**
 * @notice Fetches block objects for an array of timestamps.
 * @dev blocks are returned in chronological order (ASC) regardless of input.
 * @dev blocks are returned at string representations of Int
 * @dev timestamps are returns as they were provided; not the block time.
 * @param {Array} timestamps
 */

// Borrowed from https://github.com/ai/nanoid/blob/3.0.2/non-secure/index.js
// This alphabet uses `A-Za-z0-9_-` symbols. A genetic algorithm helped
// optimize the gzip compression for this alphabet.


export function logClient(...props) {
  if (typeof window !== "undefined") {
    console.log(...props);
  }
}

export function formatTimeBackend(time, formatType = "DD MMM YYYY") {
  if (!time) {
    return false;
  }
  return dayjs(time).format(formatType);
}

export function timestampToDate(timestamp, formatType = "YYYY/MM/DD HH:mm") {
  if (!timestamp) {
    return false;
  }
  return dayjs.unix(timestamp).format(formatType);
}

export function isCampaignEnded(expiryDate) {
  return dayjs().unix() > dayjs(expiryDate).unix();
}

export function isCampaignNotStart(startTime) {
  return dayjs().unix() < dayjs(startTime).unix();
}

export function parseTimeToText(
  expiryDate,
  createDate,
  formatType = "YYYY/MM/DD",
) {
  if (!expiryDate || !createDate) {
    return "__";
  }
  if (isCampaignEnded(expiryDate)) {
    return "Ended in " + formatTimeBackend(expiryDate, formatType);
  }
  return "Created " + formatTimeBackend(createDate, formatType);
}
