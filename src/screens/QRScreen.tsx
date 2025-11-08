import React from 'react';
import TopBar from '../components/TopBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScanQR from '../components/ScanQR';
import MyQR from '../components/MyQR';
import { primary } from '../utils/global';
import { useRoute } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const QRScreen: React.FC = () => {
  const route: any = useRoute();
  // Default to "My Code" if not specified
  const initialTab = route.params?.tab || 'My Code';

  return (
    <>
      <TopBar name="QR Code" />
      <Tab.Navigator
        initialRouteName={initialTab}
        screenOptions={{
          tabBarActiveTintColor: primary,
          tabBarIndicatorStyle: { backgroundColor: primary },
        }}
      >
        <Tab.Screen name="My Code" component={MyQR} />
        <Tab.Screen name="Scan" component={ScanQR} />
      </Tab.Navigator>
    </>
  );
};

export default QRScreen;
