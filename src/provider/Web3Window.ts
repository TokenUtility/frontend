interface Web3Window extends Window {
  readonly web3: any;
  readonly ethereum: any;
  readonly BinanceChain?: any;
}

let web3Window: any = {};
if (typeof window !== "undefined") {
  web3Window = window as unknown as Web3Window;
}
export { web3Window };
