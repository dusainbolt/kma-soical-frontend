import axios from "axios";
import { browserHistory } from "../utils/history";
import { store } from "../redux/configStore";
import { actions } from "../pages/Layout/actions";

class AxiosServer {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handelSuccess, this.handelError);
    this.instance = instance;
  }
  setAuthRequest(token) {
    if (token) {
      this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.instance.defaults.headers.common["Authorization"];
    }
  }
  getFullUrl(url) {
    if (!url.startsWith("/")) {
      url = "/" + url;
    }
    return `${process.env.REACT_APP_API_URL}/api` + url;
  }
  handelSuccess(response) {
    return response.data;
  }

  handelError(error) {
    if (error.response && error.response.status === 401) {
      const promiseList = [];
      promiseList.push(localStorage.removeItem("persist:root"));
      promiseList.push(store.dispatch(actions.postLogoutSuccess()));
      promiseList.push(browserHistory.push("/welcome"));
      Promise.all(promiseList)
        .then(resolvedList => {})
        .catch(error => {});
      // localStorage.removeItem("persist:root");
      // browserHistory.push("/welcome");
    }
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
    return Promise.reject(error);
  }

  get(endpoint, body = {}) {
    this.instance.defaults.params = body;
    return this.instance.get(this.getFullUrl(endpoint), { params: body });
  }
  post(endpoint, body) {
    return this.instance.post(this.getFullUrl(endpoint), body);
  }
  put(endpoint, body) {
    return this.instance.put(this.getFullUrl(endpoint), body);
  }
  delete(endpoint) {
    return this.instance.delete(this.getFullUrl(endpoint));
  }
}

export default new AxiosServer();
