// import { useMemo } from "react";
// import { useStores } from "@/contexts/storesContext";
// import useInterval from "@/hooks/useInterval";
// import { TokenMetadata } from "@/stores/Token";
// import { BigNumber } from "@/utils/bignumber";
// import { normalizeBalance, toChecksum } from "@/utils/helpers";

// export const useTokenAllowances = (
//   tokenAddresses: string[] = [],
//   account?: string,
//   spender?: string,
// ): Array<BigNumber | undefined> => {
//   const {
//     root: { tokenStore },
//   } = useStores();
//   const { allowances, fetchAllowancesData } = tokenStore;

//   const valid = !!(tokenAddresses.length && account && spender);
//   useInterval(
//     () => fetchAllowancesData(account, tokenAddresses, spender),
//     valid ? 15000 : null,
//   );

//   return useMemo(() => {
//     return tokenAddresses.map((tokenAddress) => {
//       if (!tokenAddress || !account || !spender) {
//         return undefined;
//       }

//       if (allowances) {
//         const _tokenAddress = tokenAddress?.toLowerCase();
//         const _spender = spender?.toLowerCase();
//         const tokenApprovals = allowances[_tokenAddress];

//         if (tokenApprovals) {
//           const userApprovals = tokenApprovals[account];
//           if (userApprovals && userApprovals[_spender]) {
//             return userApprovals[_spender].allowance;
//           }
//         }
//       }
//       return undefined;
//     });
//   }, [allowances, tokenAddresses, account, spender]);
// };

// export const useTokenAllowance = (
//   tokenAddress?: string,
//   account?: string,
//   spender?: string,
// ): BigNumber | undefined => {
//   return useTokenAllowances(
//     tokenAddress ? [tokenAddress] : [],
//     account,
//     spender,
//   )[0];
// };

// export const useTokenBalance = (
//   token?: any,
//   requestAccount?: string,
// ): BigNumber | undefined => {
//   const {
//     root: { tokenStore, providerStore },
//   } = useStores();
//   const { balances, fetchBalancerTokenData } = tokenStore;
//   const { account: yourAccount } = providerStore.providerStatus;
//   const { address } = token || ({} as TokenMetadata);
//   const tokenAddress = toChecksum(address);

//   const account = requestAccount ?? yourAccount;

//   const valid = !!(tokenAddress && account);
//   useInterval(
//     () => fetchBalancerTokenData(account, [tokenAddress]),
//     valid ? 15000 : null,
//   );

//   return useMemo(() => {
//     if (!tokenAddress || !account) {
//       return;
//     }

//     if (balances) {
//       const tokenBalances = balances[tokenAddress];
//       if (tokenBalances) {
//         const balance = tokenBalances[account];
//         if (balance) {
//           if (balance.balance) {
//             return normalizeBalance(balance.balance || 0, token.decimals);
//           }
//         }
//       }
//     }
//     return undefined;
//   }, [balances, tokenAddress, account, token]);
// };
