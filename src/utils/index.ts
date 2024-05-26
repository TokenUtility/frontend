import { getAddress } from "@ethersproject/address";
import { ChainId } from "@/constants";
import { networkConnectors } from "@/provider/networkConnectors";
import { getNetworkConfigs } from "@/provider/networks";
import { EtherKey } from "@/stores/Token";
import { EtherBigNumber, toEtherBigNumber } from "@/utils/bignumber";
import { isAddressEqual } from "@/utils/helpers";
import dayjs from "dayjs";
// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value?.toLowerCase());
  } catch {
    return false;
  }
}

export function checkStringIsAddress(_str: string): string | false {
  const str = _str?.toString();
  if (!str || !/^0x/.test(str) || str.length !== 42) {
    return false;
  }
  return isAddress(str.toString());
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  if (!address) {
    return "";
  }
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
    return "";
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function getEtherscanLink(
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
      return `${prefix}/token/${data}`;
    }
    case "block": {
      return `${prefix}/block/${data}`;
    }
    case "address":
    default: {
      return `${prefix}/address/${data}`;
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

// add 10%
export function calculateGasMargin(
  _value: string | EtherBigNumber,
): EtherBigNumber {
  let value = _value;
  if (typeof value === "string") {
    value = toEtherBigNumber(value);
  }
  return value
    .mul(EtherBigNumber.from(10000).add(EtherBigNumber.from(1000)))
    .div(EtherBigNumber.from(10000));
}

export function toChecksum(address) {
  try {
    return isAddressEqual(address, EtherKey)
      ? address
      : getAddress(address?.toLowerCase());
  } catch (e) {
    return "";
  }
}

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
