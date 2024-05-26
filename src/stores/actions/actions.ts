import { Contract } from "ethers";
import { TransactionResponse } from "@ethersproject/providers";
import { ChainId } from "@/constants";
import { networkConnectors } from "@/provider/networkConnectors";
import { bnum } from "@/utils/helpers";
import { logClient } from "@/utils";
// import { abi as BPoolABI } from '../../abi/BPool.json';
// import { abi as routerABI } from '../../abi/ExchangeProxy.json';

interface ActionRequest {
  contract: Contract;
  action: string;
  sender: string;
  data: any[];
  overrides: any;
}

export interface ActionResponse {
  contract: Contract;
  action: string;
  sender: string;
  data: object;
  txResponse: TransactionResponse | undefined;
  error: any | undefined;
}

const preLog = (params: ActionRequest) => {
  logClient(`[@action start: ${params.action}]`, {
    contract: params.contract,
    action: params.action,
    sender: params.sender,
    data: JSON.parse(JSON.stringify(params.data || "")),
    overrides: params.overrides,
  });
};

const postLog = (result: ActionResponse) => {
  logClient(`[@action end: ${result.action}]`, {
    contract: result.contract,
    action: result.action,
    sender: result.sender,
    data: JSON.parse(JSON.stringify(result.data || "")),
    result: result.txResponse,
    error: result.error,
  });
};

export const sendAction = async (
  params: ActionRequest,
): Promise<ActionResponse> => {
  const { contract, action, sender, data, overrides } = params;
  preLog(params);

  const actionResponse: ActionResponse = {
    contract,
    action,
    sender,
    data,
    txResponse: undefined,
    error: undefined,
  };

  try {
    let error = null;
    //
    if (!overrides.gasLimit) {
      // Gas estimation
      const gasLimitNumber = await contract.estimateGas[action](
        ...data,
        overrides,
      ).catch((e) => {
        if (networkConnectors.getCurrentChainId() !== ChainId.MAINNET) {
          error = e;
          console.error(`${action}:`, e);
          return bnum(4e6);
        }

        console.debug("Error - " + action, e);
        return null;
      });

      if (gasLimitNumber) {
        const gasLimit = gasLimitNumber.toNumber();
        overrides.gasLimit = Math.floor(gasLimit * 1.2);
      }
      // ==========
    }

    actionResponse.txResponse = await contract[action](...data, overrides);
    if (error) {
      actionResponse.error = error;
    }
  } catch (e) {
    actionResponse.error = e;
  }

  postLog(actionResponse);
  return actionResponse;
};
