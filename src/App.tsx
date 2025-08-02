import { enableScreens } from 'react-native-screens';
enableScreens();

import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import '../global.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Toast from 'react-native-toast-message';
import { requestUserPermission } from './utils/firebaseNotificationService';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

const App: React.FC = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          '🔁 App opened from background via notification:',
          remoteMessage,
        );
        // Navigate user if needed
      });

      // For cold start (when app is launched from quit state)
      Platform.OS === 'android' &&
        messaging()
          .getInitialNotification()
          .then(remoteMessage => {
            if (remoteMessage) {
              console.log(
                '📦 App opened from quit via notification:',
                remoteMessage,
              );
              // Navigate user if needed
            }
          });
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('📥 Foreground Message:', remoteMessage);
        Alert.alert('New Notification', remoteMessage.notification?.body || '');
      });

      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    Platform.OS === 'android' && requestUserPermission();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast />
    </Provider>
  );
};

export default App;
