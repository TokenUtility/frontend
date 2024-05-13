import { networkConnectors } from "../provider/networkConnectors";
import { apiRequest, getStatsErrorMessage } from "@/utils/apiRequest";
import { authRequest } from "@/utils/authRequest";
import { deleteCookie, setCookie, getCookie, parseJwt } from "@/utils/helpers";
import RootStore from "./Root";
import { makeAutoObservable, runInAction } from "mobx";


export interface ProfileProps {
  address: string;
  avatar: string;
  banner: string;
  createdAt: string;
  displayName: string;
  email: string;
  id: number;
  shortBio: string;
  socialLinks: string;
  updatedAt: string;
  username: string;
  wallets: string;
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
      address: "",
      avatar: "",
      banner: "",
      createdAt: "",
      displayName: "",
      email: "",
      id: null,
      shortBio: "",
      socialLinks: null,
      updatedAt: "",
      username: "",
      wallets: null,
    };
    this.totalActiveProjects = 0;
    this.totalEndedProjects = 0;
    this.totalContributors = 0;
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
          message || "Something went wrong"
        );
        return {};
      });
  };

  // createSiweMessage = async () => {
  //   try {
  //     const { providerStore, userStore, appStore } = this.rootStore;
  //     const Signer = providerStore.getSigner();
  //     const address = await Signer.signer.getAddress();
  //     const nonce = await userStore.getUserNonce(address);
  //     const message = new SiweMessage({
  //       domain: appStore.domain || window?.location.host,
  //       address,
  //       statement: "Sign in with Ethereum to the app.",
  //       uri: appStore.origin || window?.location.origin,
  //       version: "1",
  //       chainId: providerStore.providerStatus.activeChainId,
  //       nonce: nonce,
  //     });
  //     return message.prepareMessage();
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // handleLoginWallet = async () => {
  //   try {
  //     const { providerStore, notificationStore } = this.rootStore;
  //     const signer = providerStore.getSigner();
  //     const message = await this.createSiweMessage();
  //     const signatureHash = await signer.signMessage(message);
  //     const baseUrl = networkConnectors.getAPIUrl();

  //     return apiRequest
  //       .post(baseUrl + "/v1/auth/signin", {
  //         signature: signatureHash,
  //         message: message,
  //       })
  //       .then((res) => {
  //         const { data } = res;
  //         runInAction(() => {
  //           this.profile = data.user;
  //           this.accessToken = data?.token;
  //         });
  //         const authData = {
  //           address: data?.user?.address,
  //           accessToken: data?.token,
  //         };
  //         setCookie("auth_data", JSON.stringify(authData), 1, "hours");
  //         notificationStore.showSuccessNotification(
  //           res.message && "Login Successfully!"
  //         );
  //         return data;
  //       })
  //       .catch((e) => {
  //         const message = getStatsErrorMessage(e);
  //         notificationStore.showErrorNotification(
  //           message || "Something went wrong"
  //         );
  //         throw e;
  //       });
  //   } catch (error) {
  //     console.error("error", error);
  //   }
  // };

  // getProfile = () => {
  //   const { notificationStore } = this.rootStore;
  //   const baseUrl = networkConnectors.getAPIUrl();
  //   const authData = getCookie("auth_data")
  //     ? JSON.parse(getCookie("auth_data"))
  //     : "";
  //   const { address } = authData;

  //   return authRequest
  //     .get(baseUrl + `/v1/users/${address}`, {})
  //     .then((res) => {
  //       runInAction(() => {
  //         this.profile = res?.data;
  //       });
  //       return res?.data;
  //     })
  //     .catch((err) => {
  //       const message = getStatsErrorMessage(err);
  //       notificationStore.showErrorNotification(
  //         message || "Something went wrong"
  //       );
  //       throw err;
  //     });
  // };

  // reLoginByAccessToken = async (accessToken) => {
  //   const { notificationStore } = this.rootStore;
  //   try {
  //     await this.confirmAccessToken(accessToken);
  //     runInAction(() => {
  //       this.accessToken = accessToken;
  //     });
  //     this.getProfile();
  //     return accessToken;
  //   } catch (error) {
  //     deleteCookie("auth_data");
  //     const hasMessage = !!getStatsErrorMessage(error);
  //     notificationStore.showErrorNotification(
  //       (hasMessage && "Please login again") || "Something went wrong"
  //     );
  //     // throw new Error(message);
  //   }
  // };

  // confirmAccessToken = async (token) => {
  //   const { notificationStore } = this.rootStore;
  //   const baseUrl = networkConnectors.getAPIUrl();

  //   return authRequest
  //     .get(baseUrl + "/v1/auth/confirm", {
  //       token,
  //     })
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .catch((e) => {
  //       const message = getStatsErrorMessage(e);
  //       notificationStore.showErrorNotification(
  //         message || "Something went wrong"
  //       );
  //       throw e;
  //     });
  // };

  handleLogout = () => {
    deleteCookie("auth_data");
    this.profile = {
      address: null,
      avatar: null,
      banner: null,
      createdAt: null,
      displayName: null,
      email: null,
      id: null,
      shortBio: null,
      socialLinks: null,
      updatedAt: null,
      username: null,
      wallets: null,
    };
    this.accessToken = null;
  };

  setTotalActiveProjects = (value) => {
    this.totalActiveProjects = value;
  };
  setTotalEndedProjects = (value) => {
    this.totalEndedProjects = value;
  };
  setTotalContributors = (value) => {
    this.totalContributors = value;
  };
}
