import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('🔓 Firebase permission granted:', authStatus);
    await getFcmToken();
  } else {
    console.log('❌ Firebase permission denied');
  }

  // Android 13+ (API 33+) runtime POST_NOTIFICATIONS
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    console.log('Android Notification Permission:', granted);
  }
};

export const getFcmToken = async () => {
  const token = await messaging().getToken();
  if (token) {
    console.log('📲 FCM Token:', token);
    // TODO: Send token to your server if needed
  } else {
    console.log('Failed to get FCM token');
  }
};
