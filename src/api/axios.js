import axios from 'axios';
// import { navigateRef } from '../../App';
import { AsyncStorage } from 'react-native';

// export const baseURL = "http://192.168.201.171:4040";
// export const baseURL = "http://35.154.168.37:4040";
export const baseURL = 'https://expensemanager-047k.onrender.com';

export const Axios = axios.create({ baseURL });

Axios.interceptors.response.use(
  response => response,
  async error => {
    // if (error?.response?.data?.data?.update)
    //   navigateRef?.current.navigate(
    //     "DownloadApk",
    //     error?.response?.data?.data?.update
    //   );

    // if (error?.response?.status === 401) {
    //   await AsyncStorage.clear();
    //   navigateRef?.current.navigate('Login');
    // }
    return Promise.reject(error.response);
  },
);

Axios.interceptors.request.use(
  async config => {
    try {
      config.headers.token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjVjMzk1NmMxMmE0NTQ2ZTZkZGNjZDAiLCJpYXQiOjE3NTE1NjI4MjJ9.euppq5hEsfM66gGzlZlJYrbTdNybL77baG-v0oJy4Ik';
      // config.headers.token = (await AsyncStorage.getItem('token'))?.replace?.(
      //   /"/g,
      //   '',
      // );
      config.headers.version = '3.1.0';
    } catch (error) {}
    return config;
  },
  error => Promise.reject(error),
);
