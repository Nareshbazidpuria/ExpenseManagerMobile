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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthUser } from '../redux/auth';

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
  const authUser = useSelector((state: RootState) => state.authUser);
  const statusBarColor = useSelector(
    (state: RootState) => state.statusBarColor,
  );

  const checkLoggedIn = async () => {
    if (!authUser) {
      const loggedIn = await AsyncStorage.getItem('user');
      if (!loggedIn) navigationRef?.current?.navigate(screens.Login);
      else dispatch(setAuthUser(JSON.parse(loggedIn)));
    }
  };

  const onFgPush = (push: any) => dispatch(setLastPush(push?.data));

  const onBgPush = (data: any) => {
    console.log(data);
  };

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

  useEffect(() => {
    checkLoggedIn();
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
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
