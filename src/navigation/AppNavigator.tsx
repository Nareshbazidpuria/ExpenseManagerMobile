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
import notifee, { AndroidStyle, EventType } from '@notifee/react-native';
import { safeParse } from '../utils/common';
import SplashScreen from '../screens/SplashScreen';
import AddFriendScreen from '../screens/AddFriendScreen';
import ReportHistoryScreen from '../screens/ReportHisttoryScreen';

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
    dispatch(setLastPush(push?.data));
    const android: any = safeParse(push?.data?.android, {});
    if (push?.notification)
      // await notifee.displayNotification({
      //   title: 'Custom Title',
      //   body: 'This is a custom notification with colors & images',
      //   android: {
      //     channelId: 'default',
      //     color: '#FF5722', // Accent color for icons/text
      //     smallIcon: 'ic_launcher', // Custom drawable
      //     // largeIcon: 'https://example.com/user-avatar.png',
      //     // style: {
      //     //   type: AndroidStyle.BIGPICTURE,
      //     //   picture: 'https://example.com/main-image.jpg',
      //     // },
      //     // style: {
      //     //   type: AndroidStyle.MESSAGING,
      //     //   person: { name: 'Tnjiiii', icon: 'ic_launcher' },
      //     //   messages: [
      //     //     {
      //     //       text: 'Check these images',
      //     //       timestamp: Date.now(),
      //     //       person: {
      //     //         name: 'Naresh',
      //     //         icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ZyPiBkf29ztzAwpGbr4WwrjbmXWTzT8NxQ&s',
      //     //       },
      //     //     },
      //     //     {
      //     //       text: 'Here’s another one',
      //     //       timestamp: Date.now(),
      //     //       person: {
      //     //         name: 'Tannu Jii',
      //     //         icon: 'ic_launcher',
      //     //         important: true,
      //     //       },
      //     //     },
      //     //   ],
      //     // },
      //     style: {
      //       type: AndroidStyle.INBOX,
      //       lines: ['Photo 1 📷', 'Photo 2 📷', 'Photo 3 📷'],
      //     },
      //     actions: [
      //       {
      //         title: '👍 Like',
      //         pressAction: { id: 'like' },
      //       },
      //       {
      //         title: '💬 Reply',
      //         pressAction: { id: 'reply' },
      //         input: {
      //           allowFreeFormInput: true,
      //           placeholder: 'Type your reply...',
      //         },
      //       },
      //     ],
      //     pressAction: {
      //       id: 'default',
      //     },
      //   },
      // });
      // await notifee.displayNotification({
      //   title: 'Timer Running',
      //   body: 'Elapsed time',
      //   android: {
      //     channelId: 'default',
      //     chronometerDirection: 'down', // ✅ Count up like a stopwatch
      //     timestamp: Date.now() + 10000, // Start time
      //     showChronometer: true,
      //     ongoing: true, // Keeps it pinned
      //   },
      // });
      await notifee.displayNotification({
        ...(push.notification || {}),
        // title: 'Hello Naresh 👋 11',
        // body: 'Hi Naresh',
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher',
          //   progress: {
          //     current: 0.5,
          //     max: 1,
          //     indeterminate: true,
          //   },
          largeIcon: push?.data?.imageUrl,
          // style: {
          //   type: AndroidStyle.BIGPICTURE,
          //   picture: push?.data?.imageUrl, // todo conditional
          // },
          //   pressAction: { id: 'default' },
          actions: [
            {
              title: 'Mark as Read',
              pressAction: { id: 'read' },
            },
            {
              title: 'Reply',
              pressAction: { id: 'reply' },
            },
          ],
          ...android,
          ...(push.notification?.android || {}),
        },
      });
  };

  // setInterval(async () => {
  //   const elapsed = Math.floor((Date.now() - 10000) / 1000);
  //   await notifee.displayNotification({
  //     title: 'Workout Session',
  //     body: `Time elapsed: ${elapsed}s`,
  //     android: { channelId: 'default', ongoing: true },
  //   });
  // }, 1000);

  // onFgPush(2);
  const onBgPush = async (data: any) => {
    // console.log(4455545, data);
    // if (data?.notification)
    //   await notifee.displayNotification({
    //     ...(data.notification || {}),
    //     // title: 'Hello Naresh 👋 11',
    //     // body: 'Hi Naresh',
    //     // android: {
    //     //   channelId: 'default',
    //     //   smallIcon: 'ic_launcher', // drawable
    //     //   progress: {
    //     //     current: 0.5,
    //     //     max: 1,
    //     //     indeterminate: true,
    //     //   },
    //     //   largeIcon:
    //     //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ZyPiBkf29ztzAwpGbr4WwrjbmXWTzT8NxQ&s', // custom image
    //     //   style: {
    //     //     type: AndroidStyle.BIGPICTURE,
    //     //     picture:
    //     //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ZyPiBkf29ztzAwpGbr4WwrjbmXWTzT8NxQ&s',
    //     //   },
    //     //   pressAction: { id: 'default' },
    //     //   actions: [
    //     //     {
    //     //       title: 'Mark as Read',
    //     //       pressAction: { id: 'read' },
    //     //     },
    //     //     {
    //     //       title: 'Reply',
    //     //       pressAction: { id: 'reply' },
    //     //     },
    //     //   ],
    //     // },
    //   });
  };

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      console.log({ type, detail });
      if (
        type === EventType.ACTION_PRESS &&
        detail?.pressAction?.id === 'read'
      ) {
        console.log('📌 Mark as read pressed in foreground');
      }
    });
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

  useEffect(() => {
    Platform.OS === 'android' && requestUserPermission();
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
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
