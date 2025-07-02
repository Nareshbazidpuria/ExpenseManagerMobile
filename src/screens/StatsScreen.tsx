import React from 'react';
import { View, Text } from 'react-native';
import { background, inactive } from '../utils/global';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/types';
import TopBar from '../components/TopBar';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Reports'>;
type Props = { navigation: NavigationProp };

const StatsScreen: React.FC<Props> = ({}) => {
  return (
    <>
      <TopBar name="Reports" />
      <View className="flex-1 p-4" style={{ backgroundColor: background }}>
        <Text style={{ color: inactive }}>Reports Screen</Text>
      </View>
    </>
  );
};

export default StatsScreen;
