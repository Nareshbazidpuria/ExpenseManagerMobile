import { Text, View } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';

const InsightsScreen: React.FC = () => {
  return (
    <View className="flex-1">
      <TopBar name="Insights" />
      <View className="flex-1 items-center justify-center">
        <Text>This feature is under development</Text>
      </View>
    </View>
  );
};
export default InsightsScreen;
