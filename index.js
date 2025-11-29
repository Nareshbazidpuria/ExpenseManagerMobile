// import './gesture-handler';
import 'react-native-reanimated';
import { AppRegistry, Platform } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

Platform.OS === 'android' &&
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log({ type, detail, ww: 333 });
    if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'read') {
      console.log('📌 Mark as read pressed in background');
      // Perform your logic here (e.g., update server)
    }
  });

Platform.OS === 'android' &&
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('📥 Background Message:', remoteMessage);
    await notifee.displayNotification({
      ...(remoteMessage.notification || {}),
      android: {
        ...(remoteMessage.notification?.android || {}),
        channelId: 'default',
        actions: [
          {
            title: 'Mark as Read',
            pressAction: {
              id: 'read',
            },
          },
        ],
      },
    });
  });

AppRegistry.registerComponent(appName, () => App);
