import { axiosInstance } from "./axiosDefaults";

export const apiRequest = (method, url, params = {}) => {
  const response = axiosInstance()({
    method,
    url,
    params,
  });
  return response;
};
