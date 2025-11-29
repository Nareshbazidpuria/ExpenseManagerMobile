import moment from 'moment';
import { DateData } from 'react-native-calendars';
import { uploadImageApi, uploadImagesApi } from '../api/apis';
import { Animated, Easing, Platform, ToastAndroid } from 'react-native';
import { showToast } from './Toast';

export const stringToDateData = (dateString: string): DateData => {
  const date = moment(dateString, 'YYYY-MM-DD');
  return {
    dateString: date.format('YYYY-MM-DD'),
    day: date.date(),
    month: date.month() + 1,
    year: date.year(),
    timestamp: date.valueOf(),
  };
};

export const getMarkedDates = (
  startDate: string,
  endDate?: string,
  color: string = '#00bcd4',
  textColor: string = 'white',
) => {
  const marked: any = {};

  const start = moment(startDate);
  const end = endDate ? moment(endDate) : start.clone();

  const current = start.clone();

  while (current.isSameOrBefore(end)) {
    const dateStr = current.format('YYYY-MM-DD');
    marked[dateStr] = { color, textColor };
    current.add(1, 'day');
  }

  // Mark boundaries
  marked[start.format('YYYY-MM-DD')].startingDay = true;
  marked[end.format('YYYY-MM-DD')].endingDay = true;

  return marked;
};

export const uploadImage = async (image: any) => {
  try {
    const data = new FormData();
    data.append('images', {
      uri: image.uri.startsWith('file://')
        ? image.uri
        : image.uri.replace('content://', 'file://'),
      name: image.fileName || `photo.jpg`,
      type: image.type || 'image/jpeg',
    });
    const res = await uploadImageApi(data);
    return res;
  } catch (error) {
    return false;
  }
};

export const uploadImages = async (images: any = []) => {
  try {
    const data = new FormData();
    images.forEach((image: any) => {
      data.append('images', {
        uri: image.uri.startsWith('file://')
          ? image.uri
          : image.uri.replace('content://', 'file://'),
        name: image.fileName || `photo.jpg`,
        type: image.type || 'image/jpeg',
      });
    });
    const res = await uploadImagesApi(data);
    return res;
  } catch (error) {
    return error;
  }
};

export const safeParse = (data: string, defaultReturn: any = null) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return defaultReturn;
  }
};

export const message = (text: string, type?: 'success' | 'error' | 'info') => {
  if (Platform.OS === 'ios' || type) showToast(type, text);
  else ToastAndroid.show(text, ToastAndroid.SHORT);
};

export const shakeSmall = shakeAnim => {
  shakeAnim.setValue(0);
  Animated.sequence([
    Animated.timing(shakeAnim, {
      toValue: 5,
      duration: 30,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: -5,
      duration: 30,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: 2,
      duration: 30,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: -2,
      duration: 30,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: 0,
      duration: 30,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]).start();
};

export const shake = shakeAnim => {
  shakeAnim.setValue(0);
  Animated.sequence([
    Animated.timing(shakeAnim, {
      toValue: 10,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: -10,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: 6,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: -6,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: 0,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]).start();
};
