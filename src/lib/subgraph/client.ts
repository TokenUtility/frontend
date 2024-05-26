import { ApolloClient, InMemoryCache, DefaultOptions } from "@apollo/client";
import { networkConnectors } from "@/provider/networkConnectors";

const defaultOptions: DefaultOptions = {};

export const createClient = (chainId) => {
  return new ApolloClient({
    uri: networkConnectors.getSubgraphUrl(chainId),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    ssrMode: typeof window === "undefined",
  });
};
