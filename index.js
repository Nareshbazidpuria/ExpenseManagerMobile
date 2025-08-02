// import './gesture-handler';
import 'react-native-reanimated';
import { AppRegistry, Platform } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';

Platform.OS === 'android' &&
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('📥 Background Message:', remoteMessage);
  });

AppRegistry.registerComponent(appName, () => App);
