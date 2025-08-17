import axios from 'axios';
import { navigationRef } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screens } from '../utils/global';

export const baseURL = 'http://10.211.191.182:4040';
// export const baseURL = "http://35.154.168.37:4040";
// export const baseURL = 'https://expensemanager-047k.onrender.com';

export const Axios = axios.create({ baseURL });

Axios.interceptors.response.use(
  response => response,
  async error => {
    // if (error?.response?.data?.data?.update)
    //   navigateRef?.current.navigate(
    //     "DownloadApk",
    //     error?.response?.data?.data?.update
    //   );

    if (error?.response?.status === 401)
      navigationRef?.current.navigate(screens.Login, { clear: true });

    return Promise.reject(error.response);
  },
);

Axios.interceptors.request.use(
  async config => {
    try {
      config.headers.token = (await AsyncStorage.getItem('token'))?.replace?.(
        /"/g,
        '',
      );
      config.headers.version = '3.1.0';
    } catch (error) {}
    return config;
  },
  error => Promise.reject(error),
);
