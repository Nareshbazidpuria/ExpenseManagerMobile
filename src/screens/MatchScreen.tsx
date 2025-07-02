import React from 'react';
import { View, Text } from 'react-native';
import { background, inactive } from '../utils/global';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Insights'>;
type Props = { navigation: NavigationProp };

const MatchScreen: React.FC<Props> = ({}) => {
  return (
    <View className="flex-1 p-4" style={{ backgroundColor: background }}>
      <Text style={{ color: inactive }}>Insights Screen</Text>
    </View>
  );
};

export default MatchScreen;
