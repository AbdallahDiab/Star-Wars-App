import axios from "axios";
import { notification } from "antd";
const service = axios.create({
  baseURL: "https://swapi.dev/api/",
  timeout: 60000,
});

// Config
const TOKEN_PAYLOAD_KEY = "authorization";

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("auth_token") || null;

    if (jwtToken) {
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error here
    notification.error({
      message: "Error",
    });

    Promise.reject(error);
  }
);

// API respond interceptor
service.interceptors.response.use(
  (response) => {
    response.data.returnMessage &&
      notification.success({
        message: response.data.returnMessage,
      });

    return response.data;
  },
  (error) => {
    notification.error({
      message: error.response.data.message,
    });

    if (error.response.status === 404) {
      notification.error({
        message: "Not Found",
      });
    }

    if (error.response.status === 500) {
      notification.error({
        message: "Internal Server Error",
      });
    }

    if (error.response.status === 508) {
      notification.error({
        message: "Time Out",
      });
    }

    return Promise.reject(error);
  }
);

export default service;
