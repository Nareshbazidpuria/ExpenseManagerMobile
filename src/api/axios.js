import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// export const baseURL = "http://192.168.245.201:4040";
export const baseURL = "https://expensemanager-047k.onrender.com";

export const Axios = axios.create({ baseURL });

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // if (error?.response?.status === 401) {
    //   await AsyncStorage.clear();
    //   Navigate("Login");
    // }
    return Promise.reject(error.response);
  }
);

Axios.interceptors.request.use(
  async (config) => {
    try {
      config.headers.user = JSON.parse(
        (await AsyncStorage.getItem("user")) || {}
      )._id;
    } catch (error) {}
    return config;
  },
  (error) => Promise.reject(error)
);
