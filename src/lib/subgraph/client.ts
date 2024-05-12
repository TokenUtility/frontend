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

// export const createClientReward = () => {
//   return new ApolloClient({
//     uri: "https://api.thegraph.com/subgraphs/name/piavgh/give-fund-sepolia-beta",
//     cache: new InMemoryCache(),
//     defaultOptions: defaultOptions,
//     ssrMode: typeof window === "undefined",
//   });
// };
