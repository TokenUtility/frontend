import { networkConnectors } from "../provider/networkConnectors";
import { apiRequest, getStatsErrorMessage } from "@/utils/apiRequest";
import { authRequest } from "@/utils/authRequest";
import { deleteCookie, setCookie, getCookie } from "@/utils/helpers";
import RootStore from "./Root";
import { makeAutoObservable, runInAction } from "mobx";

export interface ProfileProps {
  id: string,
  address: string,
  referralCode: string,
  createdAt: string,
  updatedAt: string
}

export default class UserStore {
  accessToken: string;
  profile: ProfileProps;
  rootStore: RootStore;
  totalActiveProjects: number;
  totalEndedProjects: number;
  totalContributors: number;

  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.accessToken = "";
    this.profile = {
      id: '',
      address: '',
      referralCode: '',
      createdAt: '',
      updatedAt: ''
    };
  }

  getUserNonce = async (address) => {
    const { notificationStore } = this.rootStore;
    const baseUrl = networkConnectors.getAPIUrl();
    if (!address) {
      return {};
    }

    return apiRequest
      .get(baseUrl + `/v1/auth/nonce/${address}`)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.error("Error getUserNonce: ", e);
        const message = getStatsErrorMessage(e);
        notificationStore.showErrorNotification(
          message || "Something went wrong",
        );
        return {};
      });
  };

  handleLoginWallet = async () => {
    try {
      const { providerStore, notificationStore, userStore } = this.rootStore;
      const address = providerStore.providerStatus.account;
      const nonce = await userStore.getUserNonce(address);
      const message = `${address}-${nonce}`;
      const signatureRes =
        await providerStore.providerStatus.activeWallet.signPersonalMessage(
          {message: new TextEncoder().encode(message)},
        );
      const baseUrl = networkConnectors.getAPIUrl();

      return apiRequest
        .post(baseUrl + "/v1/auth/signin", {
          signature: signatureRes.signature,
          message: message,
        })
        .then((res) => {
          const { data } = res;
          runInAction(() => {
            this.profile = data.account;
            this.accessToken = data?.token;
          });
          const authData = {
            address: data?.account?.address,
            accessToken: data?.token,
          };
          setCookie("auth_data", JSON.stringify(authData), 1, "hours");
          notificationStore.showSuccessNotification(
            res.message && "Login Successfully!",
          );
          return data;
        })
        .catch((e) => {
          const message = getStatsErrorMessage(e);
          notificationStore.showErrorNotification(
            message || "Something went wrong",
          );
          throw e;
        });
    } catch (error) {
      console.error("error", error);
    }
  };

  getProfile = () => {
    const { notificationStore } = this.rootStore;
    const baseUrl = networkConnectors.getAPIUrl();
    const authData = getCookie("auth_data")
      ? JSON.parse(getCookie("auth_data"))
      : "";
    const { address } = authData;

    return authRequest
      .get(baseUrl + `/v1/accounts/${address}`, {})
      .then((res) => {
        runInAction(() => {
          this.profile = res?.data;
        });
        return res?.data;
      })
      .catch((err) => {
        const message = getStatsErrorMessage(err);
        notificationStore.showErrorNotification(
          message || "Something went wrong",
        );
        throw err;
      });
  };

  reLoginByAccessToken = async (accessToken) => {
    const { notificationStore } = this.rootStore;
    try {
      await this.confirmAccessToken(accessToken);
      runInAction(() => {
        this.accessToken = accessToken;
      });
      return accessToken;
    } catch (error) {
      deleteCookie("auth_data");
      const hasMessage = !!getStatsErrorMessage(error);
      notificationStore.showErrorNotification(
        (hasMessage && "Please login again") || "Something went wrong",
      );
      // throw new Error(message);
    }
  };

  confirmAccessToken = async (token) => {
    const { notificationStore } = this.rootStore;
    const baseUrl = networkConnectors.getAPIUrl();

    return authRequest
      .get(baseUrl + "/v1/auth/confirm", {
        token,
      })
      .then((res) => {
        runInAction(() => {
          this.profile = res?.data;
        });
        return res.data;
      })
      .catch((e) => {
        const message = getStatsErrorMessage(e);
        notificationStore.showErrorNotification(
          message || "Something went wrong",
        );
        throw e;
      });
  };
  updateAccountReferralCode = async (referralCode) => {
    const { notificationStore } = this.rootStore;
    const baseUrl = networkConnectors.getAPIUrl();

    return authRequest
      .put(baseUrl + `/v1/accounts/${this.profile.address}`, {
        referralCode,
      })
      .then((res) => {
        notificationStore.showSuccessNotification(
          res.message && "Update Successfully!",
        );
        runInAction(() => {
          this.profile = res?.data;
        });
        return res.data;
      })
      .catch((e) => {
        const message = getStatsErrorMessage(e);
        notificationStore.showErrorNotification(
          message || "Something went wrong",
        );
        throw e;
      });
  };

  handleLogout = () => {
    deleteCookie("auth_data");
    this.profile = {
      id: '',
      address: '',
      referralCode: '',
      createdAt: '',
      updatedAt: ''
    };
    this.accessToken = null;
  };
}
