import React, { useEffect, useRef } from 'react';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
import { NavigationContainer } from '@react-navigation/native';
import { primary, screens } from '../utils/global';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StatusBar } from 'react-native';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import QRScreen from '../screens/QRScreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import ReportScreen from '../screens/ReportScreen';
import LoginSignup from '../screens/LoginSignup';
import ForgotPwd from '../screens/ForgotPwd';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { requestUserPermission } from '../utils/firebaseNotificationService';
import messaging from '@react-native-firebase/messaging';
import { setLastPush } from '../redux/push';
import InsightsScreen from '../screens/InsightsScreen';
import notifee, { EventType } from '@notifee/react-native';
import { safeParse } from '../utils/common';
import SplashScreen from '../screens/SplashScreen';
import AddFriendScreen from '../screens/AddFriendScreen';
import ReportHistoryScreen from '../screens/ReportHisttoryScreen';
import PersonalExpensesScreen from '../screens/PersonalExpensesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const tabs = (props: BottomTabBarProps) => <TabBar {...props} />;

const Tabs = () => {
  return (
    <>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={tabs}>
        <Tab.Screen name={screens.Home} component={HomeScreen} />
        <Tab.Screen name={screens.Reports} component={ReportScreen} />
        <Tab.Screen name={screens.Insights} component={InsightsScreen} />
        <Tab.Screen name={screens.Profile} component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};

export let navigationRef: any = null;

const AppNavigator: React.FC = () => {
  navigationRef = useRef(null);
  const dispatch = useDispatch();
  const statusBarColor = useSelector(
    (state: RootState) => state.statusBarColor,
  );

  const onFgPush = async (push: any) => {
    if (!push?.data) return;
    dispatch(setLastPush(push.data));
    const android: any = safeParse(push.data.android, {});
    if (push.data.imageUrl) android.largeIcon = push.data.imageUrl;
    if (push.data.title && push.data.body) {
      await notifee.displayNotification({
        title: push.data.title,
        subtitle: push.data.subtitle,
        body: push.data.body,
        android: {
          channelId: 'default',
          sound: 'default',
          smallIcon: 'ic_launcher', // ensure you have this icon in your resources
          ...android,
        },
      });
    }
  };

  const onBgPush = async (data: any) => {
    if (data?.notification) {
      await notifee.displayNotification(data.notification);
    }
  };

  // useEffect(() => {
  //   return notifee.onForegroundEvent(data => {
  //     // console.log(444, data);
  //     // if (
  //     //   type === EventType.ACTION_PRESS &&
  //     //   detail?.pressAction?.id === 'read'
  //     // ) {
  //     //   console.log('📌 Mark as read pressed in foreground');
  //     // }
  //   });
  // }, []);

  useEffect(() => {
    Platform.OS === 'android' && requestUserPermission();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      // For cold start (when app is launched from quit state)
      const unsubscribe = messaging().onNotificationOpenedApp(onBgPush);
      messaging().getInitialNotification().then(onBgPush);
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      // For foreground notifications
      const unsubscribe = messaging().onMessage(onFgPush);
      return unsubscribe;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top']}
        className="flex-1"
        style={{ backgroundColor: statusBarColor || primary }}
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screens.Splash} component={SplashScreen} />
            <Stack.Screen name={screens.Tabs} component={Tabs} />
            <Stack.Screen name={screens.QR} component={QRScreen} />
            <Stack.Screen
              name={screens.CreateGroup}
              component={CreateGroupScreen}
            />
            <Stack.Screen name={screens.Expenses} component={ExpensesScreen} />
            <Stack.Screen
              name={screens.AddExpense}
              component={AddExpenseScreen}
            />
            <Stack.Screen name={screens.Login} component={LoginSignup} />
            <Stack.Screen name={screens.ForgotPwd} component={ForgotPwd} />
            <Stack.Screen
              name={screens.Notifications}
              component={NotificationScreen}
            />
            <Stack.Screen
              name={screens.AddFriend}
              component={AddFriendScreen}
            />
            <Stack.Screen
              name={screens.ReportHistory}
              component={ReportHistoryScreen}
            />
            <Stack.Screen
              name={screens.PersonalExpenses}
              component={PersonalExpensesScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
