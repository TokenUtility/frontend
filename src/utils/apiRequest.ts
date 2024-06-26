import axios from "axios";

const MAX_TIMEOUT_REQUEST = 30000;
const instance = axios.create({
  timeout: MAX_TIMEOUT_REQUEST,
});

export function getResponseError(res) {
  return res && res.response && res.response.data ? res.response.data : null;
}

export function getStatsErrorMessage(res) {
  const data = getResponseError(res);
  return (data && data?.message) || "";
}

class ApiRequest {
  public getUrl(url) {
    return url;
  }

  public getHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }

  public handleErrors(err) {
    if (err && err.response && err.response.status) {
      const statusCode = err.response.status;
      if (statusCode === 401) {
      } else if (statusCode === 504) {
      } else {
      }
    }
    return Promise.reject(err);
  }

  public responseBody(res) {
    if (res.status === 401) {
      // unauthorized error
    } else {
      if (res.status >= 200 && res.status <= 399) {
        if (
          typeof res.data === "undefined" ||
          typeof res.data?.status === "undefined" ||
          res.data?.status === "1"
        ) {
          return res.data;
        } else if (res.data.status >= 200 && res.data.status <= 399) {
          return res.data;
        } else {
          return Promise.reject({ response: { data: res.data } });
        }
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

  public get = (url: string, data = {}, config = {}) =>
    instance
      .get(this.getUrl(url), { ...config, params: data })
      .then(this.responseBody)
      .then(this.resolveData)
      .catch(this.handleErrors);

  public post = (url: string, data) =>
    instance
      .post(this.getUrl(url), this.jsonData(data), {
        headers: this.getHeaders(),
      })
      .then(this.responseBody)
      .then(this.resolveData)
      .catch(this.handleErrors);

  public postForm = (url: string, data) =>
    instance
      .post(this.getUrl(url), data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(this.responseBody)
      .then(this.resolveData)
      .catch(this.handleErrors);

  public put = (url: string, data) =>
    instance
      .put(this.getUrl(url), this.jsonData(data), {
        headers: this.getHeaders(),
      })
      .then(this.responseBody)
      .then(this.resolveData)
      .catch(this.handleErrors);

  public delete = (url: string, data) =>
    instance
      .delete(this.getUrl(url), {
        data: this.jsonData(data),
        headers: this.getHeaders(),
      })
      .then(this.responseBody)
      .then(this.resolveData)
      .catch(this.handleErrors);
}

const apiRequest = new ApiRequest();
export { apiRequest };
