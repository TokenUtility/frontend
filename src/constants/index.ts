export enum ChainId {
  MAINNET = "sui:mainnet",
  TESTNET = "sui:testnet",
  DEVNET = "sui:devnet",
}

export const PAGE_SIZE = {
  HOME: 9,
};

export const PERCENT_DISTRIBUTION = {
  DIRECT_POOL: 90,
  PLATFORM_FEE: 10,
};

export const HISTORY_TYPE = {
  DEPOSIT: "DEPOSIT",
  CLAIM: "CLAIM",
};
export const HISTORY_STATUS = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
};

export const HISTORY_STATUS_COLOR = {
  SUCCESS: "#21c186",
  FAILED: "#e10000",
  PENDING: "#feb42d",
  PROCESSING: "#feb42d",
};
