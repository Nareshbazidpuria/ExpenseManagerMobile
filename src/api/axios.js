import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const baseURL = "http://192.168.127.201:4040";
// export const baseURL = "https://expensemanager-047k.onrender.com";

export const Axios = axios.create({ baseURL });

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) await AsyncStorage.clear();
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
    } catch (error) {}
    return config;
  },
  (error) => Promise.reject(error)
);
