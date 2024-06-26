import { useCallback } from "react";
import { useStores } from "../contexts/storesContext";
import { getSuiScanLink } from "../utils";

export const useGetSuiScanLink = () => {
  const {
    root: { providerStore },
  } = useStores();
  const { activeChainId } = providerStore.providerStatus;
  return useCallback(
    (
      data: string,
      type: "transaction" | "token" | "address" | "block" = "address",
    ) => {
      return getSuiScanLink(activeChainId, data, type);
    },
    [activeChainId],
  );
};
