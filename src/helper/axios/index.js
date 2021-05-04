import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const getHttpRequest = (url, data) => {
  const config = createAxiosConfig(`${BASE_URL}${url}`, data);
  config.method = "get";
  return axios(config);
};

export const patchHttpRequest = (url, data) => {
  const config = createAxiosConfig(`${BASE_URL}${url}`, data);
  config.method = "patch";
  return axios(config);
};

export const putHttpRequest = (url, data) => {
  const config = createAxiosConfig(`${BASE_URL}${url}`, data);
  config.method = "put";
  return axios(config);
};
export const postHttpRequest = (url, data) => {
  const config = createAxiosConfig(`${BASE_URL}${url}`, data);
  config.method = "post";

  return axios(config);
};

export const deleteHttpRequest = (url) => {
  const config = createAxiosConfig(`${BASE_URL}${url}`);
  config.method = "delete";

  return axios(config);
};

const createAxiosConfig = (url, data) => {
  const jwtToken = localStorage.getItem("token");

  const axiosConfig = {
    url,
  };

  if (data) {
    axiosConfig.data = data;
  }

  if (jwtToken) {
    axiosConfig.headers = { Authorization: jwtToken };
  }

  return axiosConfig;
};
