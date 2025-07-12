import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from '../utils/types';
import TopBar from '../components/TopBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScanQR from '../components/ScanQR';
import MyQR from '../components/MyQR';
import { primary } from '../utils/global';

const Tab = createMaterialTopTabNavigator();

type NavigationProp = StackNavigationProp<RootStackParamList, 'QR'>;
type Props = { navigation: NavigationProp };

const QRScreen: React.FC<Props> = ({}) => {
  return (
    <>
      <TopBar name="QR Code" />
      <Tab.Navigator
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
