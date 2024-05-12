import * as ethers from "ethers";
import { Deferrable } from "@ethersproject/properties";
import { TransactionRequest, Provider } from "@ethersproject/abstract-provider";

class UncheckedJsonRpcSigner extends ethers.Signer {
  public signer: any;

  constructor(signer) {
    super();
    ethers.utils.defineReadOnly(this, "signer", signer);
    ethers.utils.defineReadOnly(this, "provider", signer.provider);
  }

  public getAddress() {
    return this.signer.getAddress();
  }

  public sendTransaction(transaction) {
    return this.signer.sendUncheckedTransaction(transaction).then((hash) => {
      return {
        hash,
        nonce: null,
        gasLimit: null,
        gasPrice: null,
        data: null,
        value: null,
        chainId: null,
        confirmations: 0,
        from: null,
        wait: (confirmations) => {
          return this.signer.provider.waitForTransaction(hash, confirmations);
        },
      };
    });
  }

  public signMessage(message) {
    return this.signer.signMessage(message);
  }

  public signTransaction(transaction: Deferrable<TransactionRequest>) {
    return this.signer.signTransaction(transaction);
  }

  public connect(provider: Provider) {
    return this.signer.connect(provider);
  }
}

export default UncheckedJsonRpcSigner;
