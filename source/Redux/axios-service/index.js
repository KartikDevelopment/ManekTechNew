import axios from "axios";
import {BASE_URL} from "../../../env.json"
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.timeout = 15000;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('interceptor response error', JSON.stringify(error));
    // return Promise.reject({ error, response: { status: 408 } });
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  (response) => response,
  (error) => {
    console.log('interceptor request error', error);
    return Promise.reject(error);
  },
);

const AxiosService = function async(){
  async function addHeaders(userConfig) {
    const {
      params, headers, timeout, ...restConfigs
    } = userConfig;
    const globalHeaders = {};
    globalHeaders.language = "english";
    const { filter, ...restParams } = params || {};
    return {
      headers: {
       ...globalHeaders
      },
      timeout,
    }
  }
  async function get(endPoint, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.get(endPoint, headers);
  }
  async function post(endPoint, params = {}, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.post(endPoint, params, headers);
  }

  async function put(endPoint, params = {}, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.put(endPoint, params, headers);
  }

  async function remove(endPoint, params = {}, userConfig = {}) {
    const headers = await addHeaders(userConfig);
    return axios.delete(endPoint, { ...headers, data: params });
  }
  return {
    get,
    post,
    put,
    remove
  }
}
export default AxiosService();