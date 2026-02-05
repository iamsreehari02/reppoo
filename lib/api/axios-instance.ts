import axios from "axios";
import { getBaseURL } from "./config";

declare module "axios" {
  interface AxiosRequestConfig {
    _skipRefreshInterceptor?: boolean;
    _retried?: boolean;
  }
}

export const axiosInstance = axios.create({
  baseURL: getBaseURL() || undefined,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData && config.headers) {
    delete config.headers["Content-Type"];
  }
  return config;
});
