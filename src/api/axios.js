import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { navigateRef } from "../../App";

// export const baseURL = "http://192.168.254.171:4040";
export const baseURL = "https://expensemanager-047k.onrender.com";

export const Axios = axios.create({ baseURL });

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.data?.data?.update)
      navigateRef?.current.navigate(
        "DownloadApk",
        error?.response?.data?.data?.update
      );

    if (error?.response?.status === 401) {
      await AsyncStorage.clear();
      navigateRef?.current.navigate("Login");
    }
    return Promise.reject(error.response);
  }
);

Axios.interceptors.request.use(
  async (config) => {
    try {
      config.headers.token = (await AsyncStorage.getItem("token"))?.replace?.(
        /"/g,
        ""
      );
      config.headers.version = "3.1.0";
    } catch (error) {}
    return config;
  },
  (error) => Promise.reject(error)
);
