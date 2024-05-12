import axios from "axios";
import RootStore from "@/stores/Root";
import { getCookie } from "@/utils/helpers";

const MAX_TIMEOUT_REQUEST = 20000;
const instance = axios.create({
  timeout: MAX_TIMEOUT_REQUEST,
});

class AuthRequest {
  public rootStore: RootStore;

  constructor() {
    this.rootStore = null;
  }
  public getUrl(url) {
    return url;
  }
  public initStore = (store) => {
    this.rootStore = store;
  };
  public getAuthorization() {
    let accessToken = "";
    try {
      const authData = getCookie("auth_data")
        ? JSON.parse(getCookie("auth_data"))
        : {};
      accessToken = authData.accessToken;
    } catch (e) {
      // do nothing
    }
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  public getHeaders() {
    return {
      ...this.getAuthorization(),
      "Content-Type": "application/json",
    };
  }

  public handleUnauthorized = (message) => {
    if (this.rootStore) {
      //   const errMsg = message || 'Unauthorized'
      try {
        const { userStore } = this.rootStore;
        userStore.handleLogout();
      } catch (_) {}
    }
  };

  public handleErrors = (err) => {
    if (err && err.response && err.response.status) {
      const { status: statusCode, data } = err.response;
      if (statusCode === 401) {
        const errMsg = data && data.message ? data.message : "";
        this.handleUnauthorized(errMsg);
      } else if (statusCode === 504) {
        // appStore.setPage504(true);
      } else {
        // appStore.setPage504(false);
      }
    }
    return Promise.reject(err);
  };

  public responseBody(res) {
    // appStore.setPage504(false);
    if (res.status === 401) {
      // unauthorized error
      this.handleUnauthorized(res.message);
    } else {
      if (res.status >= 200 && res.status <= 399) {
        if (
          typeof res.data === "undefined" ||
          typeof res.data.status === "undefined"
        ) {
          return res.data;
        } else if (res.data.status >= 200 && res.data.status <= 399) {
          return res.data;
        } else {
          return Promise.reject({ response: { data: res.data } });
        }
        // return res.data
      } else {
        throw new Error(res);
      }
    }
    return res.data;
  }

  public jsonData(data) {
    return JSON.stringify(data);
  }

  public resolveData(data) {
    return Promise.resolve(data);
  }

  public get = (url, data, config = {}) =>
    instance
      .get(this.getUrl(url), {
        ...config,
        params: data,
        headers: this.getAuthorization(),
      })
      .then(this.responseBody)
      .then(this.resolveData)
      .catch(this.handleErrors);

  public post = (url, data) =>
    instance
      .post(this.getUrl(url), this.jsonData(data), {
        headers: this.getHeaders(),
      })
      .then(this.responseBody)
      .then(this.resolveData)
      .catch(this.handleErrors);

  public postForm = (url, data) =>
    instance
      .post(this.getUrl(url), data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(this.responseBody)
      .then(this.resolveData)
      .catch(this.handleErrors);

  public put = (url, data) =>
    instance
      .put(this.getUrl(url), this.jsonData(data), {
        headers: this.getHeaders(),
      })
      .then(this.responseBody)
      .then(this.resolveData)
      .catch(this.handleErrors);

  public patch = (url, data?: any) =>
    instance
      .patch(this.getUrl(url), this.jsonData(data), {
        headers: this.getHeaders(),
      })
      .then(this.responseBody)
      .then(this.resolveData)
      .catch(this.handleErrors);

  public delete = (url, data) =>
    instance
      .delete(this.getUrl(url), {
        data: this.jsonData(data),
        headers: this.getHeaders(),
      })
      .then(this.responseBody)
      .then(this.resolveData)
      .catch(this.handleErrors);
}

const authRequest = new AuthRequest();
export { authRequest };
