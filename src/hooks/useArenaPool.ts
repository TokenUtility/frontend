import useSWR from "swr";
import { networkConnectors } from "@/provider/networkConnectors";
import { ArenaPoolDataBackend } from "@/utils/types";
import { fetcher } from "@/configs/fetcher";

const useArenaPool = (
  id: string,
  chain: any
): {
  arenaPool: ArenaPoolDataBackend;
  isLoading: boolean;
  isError: any;
} => {
  const baseUrl = networkConnectors.getAPIUrl(chain);

  const { data, error, isLoading } = useSWR(
    id && baseUrl ? baseUrl + `/tokens/?where[cgkId][equals]=${id}` : null,
    fetcher,
    { }
  );

  return {
    arenaPool: data?.docs?.[0] || {},
    isLoading,
    isError: error,
  };
};

export default useArenaPool;
