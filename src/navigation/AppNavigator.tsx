import React, { useRef } from 'react';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
// import TopBar from '../components/TopBar';
import { NavigationContainer } from '@react-navigation/native';
import { primary, screens } from '../utils/global';
import MatchScreen from '../screens/MatchScreen';
import StatsScreen from '../screens/StatsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MatchDetailsScreen from '../screens/MatchDetailsScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import QRScreen from '../screens/QRScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const tabs = (props: BottomTabBarProps) => <TabBar {...props} />;

const Tabs = () => {
  return (
    <>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={tabs}>
        <Tab.Screen name={screens.Home} component={HomeScreen} />
        <Tab.Screen name={screens.Reports} component={StatsScreen} />
        <Tab.Screen name={screens.Insights} component={MatchScreen} />
        <Tab.Screen name={screens.Profile} component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};

export let navigationRef: any = null;

const AppNavigator: React.FC = () => {
  navigationRef = useRef(null);
  const { statusBarColor } = useSelector((state: RootState) => state);

  console.log(statusBarColor);

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
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name={screens.QR} component={QRScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
