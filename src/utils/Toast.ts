import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

export const showToast = (
  type: ToastType,
  text1: string,
  text2?: string,
  position: 'top' | 'bottom' = 'top',
) => {
  Toast.show({
    type,
    position,
    text1,
    text2,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
    bottomOffset: 60,
    swipeable: true,
  });
};
