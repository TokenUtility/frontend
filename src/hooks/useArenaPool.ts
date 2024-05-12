import useSWR from "swr";
import { networkConnectors } from "@/provider/networkConnectors";
import { ArenaPoolDataBackend } from "@/utils/types";
import { fetcher } from "@/configs/fetcher";

const useArenaPool = (
  id: string
): {
  arenaPool: ArenaPoolDataBackend;
  isLoading: boolean;
  isError: any;
} => {
  const baseUrl = networkConnectors.getAPIUrl();

  const { data, error, isLoading } = useSWR(
    id && baseUrl ? baseUrl + `/tokens/${id}` : null,
    fetcher,
    { }
  );

  return {
    arenaPool: data || {},
    isLoading,
    isError: error,
  };
};

export default useArenaPool;
