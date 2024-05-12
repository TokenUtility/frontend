import { Interface } from "@ethersproject/abi";
import tokenAbi from "@/abi/Token.json";
import token721Abi from "@/abi/Token721.json";
import { TokenInfo } from "@/configs/tokens";
import { ChainId } from "@/constants";
import { networkConnectors } from "@/provider/networkConnectors";
import { NETWORKS_CONFIG } from "@/provider/networks";
import { shortenAddress } from "@/utils";
import { fromWei } from "@/utils/helpers";
import { BigNumber } from "@/utils/bignumber";
import { bnum, isAddressEqual, toChecksum } from "../utils/helpers";
import * as helpers from "@/utils/helpers";
import { ContractTypes } from "@/stores/Provider";
import RootStore from "./Root";
import { FetchCode } from "./Transaction";
import { makeAutoObservable, runInAction } from "mobx";
import { computedFn } from "mobx-utils";

export interface TokenBalance extends TokenInfo {
  balance: BigNumber;
}

export interface UserAllowance {
  allowance: BigNumber;
  lastFetched: number;
}

interface TokenBalanceMap {
  [index: string]: TokenBalance | {};
}

export interface BigNumberMap {
  [index: string]: BigNumber;
}

export interface TokenMetadata {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  precision?: number;
  balanceFormatted?: string;
  balanceBn?: BigNumber;
  allowance?: BigNumber;
}

interface UserAllowanceMap {
  [index: string]: {
    [index: string]: {
      [index: string]: UserAllowance;
    };
  };
}

export const EtherKey = "ether";
export const EtherKeyMarks = ["ether", "eth", "bnb", "matic"];
export const EtherAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export default class TokenStore {
  balances: TokenBalanceMap;
  allowances: UserAllowanceMap;
  isLoadedBalancerTokenData: boolean;
  isLoadedDsProxyAllowance: boolean;
  currentBalanceChain: any;
  rootStore: RootStore;

  constructor(rootStore: any) {
    // makeObservable(this, {
    //   rootStore: observable,
    //   balances: observable,
    //   allowances: observable,
    //   isLoadedBalancerTokenData: observable,
    //   isLoadedDsProxyAllowance: observable,
    //   currentBalanceChain: observable,
    //   isLoadedInitialData: computed,
    //   getTrackedTokenAddresses: computed,
    //   getTrackedToken721Addresses: computed,
    //   getBalance: computed,
    //   getAccountBalances: computed,
    //   isAllowanceFetched: computed,
    //   isAllowanceStale: computed,
    //   isBalanceFetched: computed,
    //   isBalanceStale: computed,
    //   setIsLoadedBalancerTokenData: action,
    //   setIsLoadedDsProxyAllowance: action,
    //   setAllowances: action,
    //   setBalances: action,
    //   approve: action,
    //   approveMax: action,
    //   approveMaxCallback: action,
    //   fetchBalancerTokenData: action,
    //   fetchAllowancesData: action,
    //   fetchBalancerTokenERC721Data: action,
    //   setDecimals: action,
    // });
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.balances = {} as TokenBalanceMap;
    this.allowances = {} as UserAllowanceMap;
    this.isLoadedBalancerTokenData = false;
    this.isLoadedDsProxyAllowance = false;
    this.currentBalanceChain = null;
  }

  get isLoadedInitialData() {
    const { providerStore } = this.rootStore;
    const { account } = providerStore.providerStatus;
    return (
      !account ||
      (this.isLoadedBalancerTokenData && this.isLoadedDsProxyAllowance)
    );
  }

  get getTrackedTokenAddresses() {
    const { providerStore } = this.rootStore;
    const tokens = providerStore.getContractMetaData().tokens;
    return tokens.map((token) => token.address);
  }

  get getTrackedToken721Addresses(): string[] {
    const tokens = networkConnectors.getProtocolTokens();
    // const chainId = networkConnectors.getCurrentChainId();
    const tokens721: any[] = [];
    return tokens721.map((token) => token.address);
  }

  get getMainBalance(): string {
    const { providerStore } = this.rootStore;
    const { account } = providerStore.providerStatus;

    const token = networkConnectors.getMainToken();
    const balance = this.getBalance(token.address, account) || 0;
    // console.log({ balances: this.balances });
    return balance ? helpers.toBalanceFormatted(balance, 18) : "";
  }

  get getMaxBalance(): string {
    const { providerStore } = this.rootStore;
    const { account } = providerStore.providerStatus;

    const token = networkConnectors.getMainToken();
    const balance = this.getBalance(token.address, account);
    return fromWei(balance);
  }

  getBalance: (
    tokenAddressParam: string,
    accountParam?: string
  ) => BigNumber | undefined = computedFn((tokenAddressParam, accountParam) => {
    const chainBalances = this.balances;
    const tokenAddress = toChecksum(tokenAddressParam);
    const account = toChecksum(accountParam);
    if (chainBalances && account) {
      const tokenBalances =
        chainBalances[tokenAddress] || chainBalances[tokenAddressParam];
      if (tokenBalances) {
        const balance = tokenBalances[account] || tokenBalances[accountParam];
        if (balance) {
          if (balance.balance) {
            return balance.balance;
          }
        }
      }
    }
    return undefined;
  });

  getAccountBalances: (
    tokens: TokenMetadata[],
    account: string
  ) => BigNumberMap = computedFn((tokens, account) => {
    const userBalances = this.balances;
    if (!userBalances) {
      throw new Error("Attempting to get user balances for untracked chainId");
    }
    const result: BigNumberMap = {};
    tokens.forEach((value) => {
      if (userBalances[value.address] && userBalances[value.address][account]) {
        result[value.address] = userBalances[value.address][account].balance;
      }
    });

    return result;
  });

  isAllowanceFetched: (
    tokenAddress: string,
    owner: string,
    spender: string
  ) => boolean = computedFn((tokenAddress, owner, spender) => {
    const chainApprovals = this.allowances;
    return (
      !!chainApprovals[tokenAddress] &&
      !!chainApprovals[tokenAddress][owner] &&
      !!chainApprovals[tokenAddress][owner][spender]
    );
  });

  isAllowanceStale: (
    tokenAddress: string,
    owner: string,
    spender: string,
    blockNumber: number
  ) => boolean = computedFn((tokenAddress, owner, spender, blockNumber) => {
    const chainApprovals = this.allowances;
    return (
      chainApprovals[tokenAddress][owner][spender].lastFetched < blockNumber
    );
  });

  isBalanceFetched: (tokenAddress, account) => boolean = computedFn(
    (tokenAddress, account) => {
      const chainBalances = this.balances;
      return (
        !!chainBalances[tokenAddress] && !!chainBalances[tokenAddress][account]
      );
    }
  );

  isBalanceStale: (
    tokenAddress: string,
    account: string,
    blockNumber: number
  ) => boolean = computedFn((tokenAddress, account, blockNumber) => {
    const chainBalances = this.balances;
    return chainBalances[tokenAddress][account].lastFetched < blockNumber;
  });

  setIsLoadedBalancerTokenData(): void {
    this.isLoadedBalancerTokenData = true;
  }

  setIsLoadedDsProxyAllowance() {
    this.isLoadedDsProxyAllowance = true;
  }

  setAllowances(
    tokens: string[],
    owner: string,
    spenderParam: string,
    approvals: BigNumber[],
    fetchBlock: number
  ) {
    const chainApprovals = this.allowances;
    const spender = spenderParam?.toLowerCase();

    approvals.forEach((approval, index) => {
      const tokenAddress = tokens[index]?.toLowerCase();

      if (
        (this.isAllowanceFetched(tokenAddress, owner, spender) &&
          this.isAllowanceStale(tokenAddress, owner, spender, fetchBlock)) ||
        !this.isAllowanceFetched(tokenAddress, owner, spender)
      ) {
        if (!chainApprovals[tokenAddress]) {
          chainApprovals[tokenAddress] = {};
        }

        if (!chainApprovals[tokenAddress][owner]) {
          chainApprovals[tokenAddress][owner] = {};
        }

        chainApprovals[tokenAddress][owner][spender] = {
          allowance: approval,
          lastFetched: fetchBlock,
        };
      }
    });

    this.allowances = {
      ...this.allowances,
      ...chainApprovals,
    };
  }

  setBalances(
    tokens: string[],
    balances: BigNumber[],
    account: string,
    fetchBlock: number,
    forceUpdate?: boolean
  ) {
    const fetchedBalances: TokenBalanceMap = {};

    balances.forEach((balance, index) => {
      const tokenAddress = tokens[index];

      if (
        forceUpdate ||
        !this.isBalanceFetched(tokenAddress, account) ||
        this.isBalanceStale(tokenAddress, account, fetchBlock)
      ) {
        if (this.balances[tokenAddress]) {
          fetchedBalances[tokenAddress] = this.balances[tokenAddress];
        } else {
          fetchedBalances[tokenAddress] = {};
        }

        fetchedBalances[tokenAddress][account] = {
          balance,
          lastFetched: fetchBlock,
        };
      }
    });

    this.balances = {
      ...this.balances,
      ...fetchedBalances,
    };
  }

  getBaseCurrencies(chainId?: ChainId): [string, string] {
    const cid = chainId || networkConnectors.getCurrentChainId();
    // return ['ETH', 'WETH']
    return (cid && NETWORKS_CONFIG[cid]?.baseTokens) || ["", ""];
  }

  findTokenByAddress(tokenAddress: string): TokenMetadata | any {
    const { providerStore } = this.rootStore;
    const tokens = providerStore.getContractMetaData()?.tokens;
    if (tokenAddress === EtherKey || tokenAddress === EtherAddress) {
      return { symbol: this.getBaseCurrencies()[0], decimals: 18 };
    }
    return (
      tokens.find((t) => isAddressEqual(t.address, tokenAddress)) ||
      ({} as TokenMetadata)
    );
  }

  approve = async ({
    amountWei,
    tokenAddress,
    spender,
  }: {
    amountWei: string;
    tokenAddress: string;
    spender: string;
  }) => {
    try {
      const { providerStore, tokenStore } = this.rootStore;
      const { account } = providerStore.providerStatus;
      const { notificationStore } = this.rootStore;
      if (!account) {
        return Promise.reject("[Error] Login first");
      }

      const token = tokenStore.findTokenByAddress(tokenAddress);
      const result = await providerStore.sendTransaction(
        ContractTypes.Token,
        tokenAddress,
        "approve",
        [spender, amountWei],
        {},
        `Approve ${token.symbol || "token"} to ${shortenAddress(spender)}`
      );
      const { txResponse, error } = result;
      if (error) {
        const msg =
          error.reason ||
          error?.data?.message ||
          error?.message ||
          "Something went wrong";
        notificationStore.showErrorNotification(msg);
      } else if (txResponse && txResponse?.hash) {
        await txResponse.wait();
        await await this.fetchAllowancesData(account, [tokenAddress], spender);
        notificationStore.showSuccessNotification("Approved Success");
      }
      return txResponse;
    } catch (e) {
      return Promise.reject(`Failed to read data - ${e}`);
    }
  };

  approveMax = async (
    tokenAddress: string,
    spender: string,
    callback?: (error?: any, result?: any) => void
  ) => {
    const { providerStore } = this.rootStore;
    // maxUint = helpers.MAX_UINT.toString()
    const maxUint =
      "115792089237316195423570985008687907853269984665640564039457584007913129639935";
    const token = this.findTokenByAddress(tokenAddress);
    const result = await providerStore.sendTransaction(
      ContractTypes.Token,
      tokenAddress,
      "approve",
      [spender, maxUint],
      {},
      `Approve ${token.symbol || "token"}`
    );
    if (callback) {
      const { error, txResponse } = result || {};
      if (error && error.message) {
        callback(error.reason || error?.data?.message || error.message);
      } else if (txResponse && txResponse.hash) {
        await txResponse.wait();
        const { account } = providerStore.providerStatus;
        await this.fetchAllowancesData(account, [tokenAddress], spender);
        callback(null, result);
      }
    }
    return result;
  };

  approveMaxCallback = async (tokenAddress: string, spender: string) => {
    const { tokenStore } = this.rootStore;

    return new Promise((resolve, reject) => {
      tokenStore.approveMax(
        tokenAddress,
        spender,
        (error?: any, result?: any) => {
          if (error) {
            return reject(error);
            // return resolve(null);
          }
          resolve(result);
        }
      );
    });
  };

  fetchBalancerTokenData = async (
    account: string,
    tokensToTrack?: string[],
    spender?: string
  ): Promise<FetchCode> => {
    if (!account) {
      return FetchCode.FAILURE;
    }
    const { providerStore } = this.rootStore;
    const promises: Array<Promise<any>> = [];
    const balanceCalls: any[] = [];
    const allowanceCalls: any[] = [];
    const decimalsCalls: any[] = [];
    const tokenList: any[] = [];
    const contractMetadata = providerStore.getContractMetaData();
    const routerAddress = spender;

    const multiAddress = contractMetadata.multiCallContract;
    if (!multiAddress) {
      // const tokenAddress = contractMetadata.USDTTokenContract;
      // const tokenContract = providerStore.getContract(
      //   ContractTypes.Token,
      //   tokenAddress
      // );
      // let promises = [];
      // promises.push(tokenContract.balanceOf(account));
      // if (routerAddress) {
      //   promises.push(tokenContract.allowance(account, routerAddress));
      // }
      // const [balanceOf, allowance] = await Promise.all(promises);
      // const changedNetwork =
      //   this.currentBalanceChain !== providerStore.providerStatus.activeChainId;
      // if (routerAddress) {
      //   this.setAllowances(
      //     [tokenAddress],
      //     account,
      //     routerAddress,
      //     [allowance],
      //     5047384
      //   );
      // }

      // this.setBalances(
      //   [tokenAddress],
      //   [balanceOf, balanceOf],
      //   account,
      //   5047384,
      //   changedNetwork
      // );

      // this.setIsLoadedBalancerTokenData();
      // runInAction(() => {
      //   this.currentBalanceChain = providerStore.providerStatus.activeChainId;
      // });

      // console.debug("[fetchBalancerTokenData Success]");
      return;
    }
    const multi = providerStore.getContract(
      ContractTypes.MultiCall,
      multiAddress
    );

    const iface = new Interface(tokenAbi);
    const tokens = tokensToTrack;
    tokens.forEach((address) => {
      tokenList.push(toChecksum(address));
      if (address !== EtherKey) {
        balanceCalls.push([
          address,
          iface.encodeFunctionData("balanceOf", [account]),
        ]);
        if (routerAddress) {
          allowanceCalls.push([
            address,
            iface.encodeFunctionData("allowance", [account, routerAddress]),
          ]);
        }

        decimalsCalls.push([address, iface.encodeFunctionData("decimals", [])]);
      }
    });

    promises.push(multi.aggregate(balanceCalls));
    promises.push(multi.aggregate(allowanceCalls));
    promises.push(multi.getEthBalance(account));
    promises.push(multi.aggregate(decimalsCalls));

    try {
      const [
        [balBlock, mulBalance],
        [allBlock, mulAllowance],
        mulEth,
        [, mulDecimals],
      ] = await Promise.all(promises);

      const balances = mulBalance.map((value: any) =>
        bnum(iface.decodeFunctionResult("balanceOf", value))
      );
      const allowances = mulAllowance.map((value: any) =>
        bnum(iface.decodeFunctionResult("allowance", value))
      );

      if (tokens[0] === EtherKey) {
        const ethBalance = bnum(mulEth);
        balances.unshift(ethBalance);
        allowances.unshift(bnum(helpers.setPropertyToMaxUintIfEmpty()));
      }

      const decimalsList = mulDecimals.map((value: any) =>
        bnum(iface.decodeFunctionResult("decimals", value)).toNumber()
      );

      if (routerAddress) {
        this.setAllowances(
          tokenList,
          account,
          routerAddress,
          allowances,
          allBlock.toNumber()
        );
      }
      const changedNetwork =
        this.currentBalanceChain !== providerStore.providerStatus.activeChainId;
      this.setDecimals(tokenList, decimalsList);
      this.setBalances(
        tokenList,
        balances,
        account,
        balBlock.toNumber(),
        changedNetwork
      );
      this.setIsLoadedBalancerTokenData();
      runInAction(() => {
        this.currentBalanceChain = providerStore.providerStatus.activeChainId;
      });

      console.debug("[fetchBalancerTokenData Success]");
    } catch (e) {
      console.error("[Fetch] fetchBalancerTokenData", { error: e });
      return FetchCode.FAILURE;
    }
    return FetchCode.SUCCESS;
  };

  fetchBalancerTokenERC721Data = async (
    account: string,
    tokensToTrack?: string[]
  ): Promise<FetchCode> => {
    if (!account) {
      return FetchCode.FAILURE;
    }
    const { providerStore } = this.rootStore;
    const promises: Array<Promise<any>> = [];
    const balanceCalls: any[] = [];
    const tokenList: any[] = [];
    const contractMetadata = providerStore.getContractMetaData();
    const multiAddress = contractMetadata.multiCallContract;
    const multi = providerStore.getContract(
      ContractTypes.MultiCall,
      multiAddress
    );

    const iface = new Interface(token721Abi);

    const tokens = tokensToTrack;
    tokens.forEach((address) => {
      tokenList.push(toChecksum(address));
      if (address !== EtherKey) {
        balanceCalls.push([
          address,
          iface.encodeFunctionData("balanceOf", [account]),
        ]);
      }
    });

    promises.push(multi.aggregate(balanceCalls));

    try {
      const [[balBlock, mulBalance]] = await Promise.all(promises);

      const balances = mulBalance.map((value: any) =>
        bnum(iface.decodeFunctionResult("balanceOf", value))
      );

      const changedNetwork =
        this.currentBalanceChain !== providerStore.providerStatus.activeChainId;
      this.setBalances(
        tokenList,
        balances,
        account,
        balBlock.toNumber(),
        changedNetwork
      );
      console.debug(
        "[fetchBalancerTokenERC721Data Success]",
        tokenList,
        balances
      );
    } catch (e) {
      console.error("[Fetch] fetchBalancerTokenERC721Data", { error: e });
      return FetchCode.FAILURE;
    }
    return FetchCode.SUCCESS;
  };

  getAllowance = (
    tokenAddressParam: string,
    account: string,
    spenderParam: string
  ): BigNumber | undefined => {
    const chainApprovals = this.allowances;
    if (chainApprovals) {
      const tokenAddress = tokenAddressParam?.toLowerCase();
      const spender = spenderParam?.toLowerCase();
      const tokenApprovals = chainApprovals[tokenAddress];

      if (tokenApprovals) {
        const userApprovals = tokenApprovals[account];
        if (userApprovals) {
          if (userApprovals[spender]) {
            return userApprovals[spender].allowance;
          }
        }
      }
    }
    return undefined;
  };

  fetchAllowancesData = async (
    account: string,
    tokens: string[],
    spender: string
  ) => {
    if (!account) {
      return FetchCode.FAILURE;
    }
    const { providerStore } = this.rootStore;
    const promises: Array<Promise<any>> = [];
    const allowanceCalls: any[] = [];
    const tokenList: any[] = [];
    const contractMetadata = providerStore.getContractMetaData();
    const multiAddress = contractMetadata.multiCallContract;
    const multi = providerStore.getContract(
      ContractTypes.MultiCall,
      multiAddress
    );

    const iface = new Interface(tokenAbi);

    tokens.forEach((address) => {
      tokenList.push(address);
      if (address && address !== EtherKey) {
        allowanceCalls.push([
          address,
          iface.encodeFunctionData("allowance", [account, spender]),
        ]);
      }
    });

    promises.push(multi.aggregate(allowanceCalls));

    try {
      const [[allBlock, mulAllowance]] = await Promise.all(promises);

      const allowances = mulAllowance.map((value: any) =>
        bnum(iface.decodeFunctionResult("allowance", value))
      );
      this.setAllowances(
        tokenList,
        account,
        spender,
        allowances,
        allBlock.toNumber()
      );
      return allowances;
    } catch (e) {}
    return [];
  };

  setTokenDecimals(address: string, decimals: number) {
    const tokenUrl = this.findTokenByAddress(address);
    if (tokenUrl) {
      tokenUrl.decimals = decimals;
    }
  }

  setDecimals(tokens: string[], decimals: number[]) {
    let index = 0;
    tokens.forEach((tokenAddr) => {
      if (tokenAddr === EtherKey) {
        this.setTokenDecimals(tokenAddr, 18);
      } else {
        this.setTokenDecimals(tokenAddr, decimals[index]);
        index += 1;
      }
    });
  }
}
