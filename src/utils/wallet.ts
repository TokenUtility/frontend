import { ChainId } from "@/constants";
import { isDevEnv } from "@/utils/helpers";
import { nodes } from "@/utils/getRpcUrl";

export const setupNetwork = async () => {
  // @ts-ignore
  const provider = window.ethereum;
  if (provider) {
    // const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10);
    const chainId = parseInt(
      isDevEnv() ? ChainId.TESTNET?.toString() : ChainId.MAINNET?.toString(),
      10,
    );
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: "SUI",
            nativeCurrency: {
              name: "SUI",
              symbol: "SUI",
              decimals: 18,
            },
            rpcUrls: nodes,
            blockExplorerUrls: ["https://explorer.sui.network/"],
          },
        ],
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined",
    );
    return false;
  }
};

export default setupNetwork;
