import axios from 'axios';
import { navigationRef } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screens, version } from '../utils/global';
import { message } from '../utils/common';

export const baseURL = 'http://10.187.81.182:4040';
// export const baseURL = "http://35.154.168.37:4040";
// export const baseURL = 'https://expense-manager-vstu.onrender.com';
// export const baseURL = 'https://expensemanager-047k.onrender.com';

export const Axios = axios.create({ baseURL });

Axios.interceptors.response.use(
  response => {
    console.log('⬅️ Response:', response);
    return response;
  },
  async error => {
    if (error?.response?.data?.data?.update)
      message('A new update is available. Please update', 'info');
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
  async req => {
    try {
      console.log('➡️ Request:', req.method, req.url, req.data);
      req.headers.token = (await AsyncStorage.getItem('token'))?.replace?.(
        /"/g,
        '',
      );
      req.headers.version = version;
    } catch (error) {}
    return req;
  },
  error => Promise.reject(error),
);
