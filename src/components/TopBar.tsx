import * as React from 'react';
import { BackHandler, Text, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { background, primary } from '../utils/global';

const TopBar: React.FC<{ name: string; search?: boolean }> = ({
  name,
  search,
}) => {
  return (
    <View
      className="flex-row justify-between items-center pl-0 pr-4 py-3"
      style={{ backgroundColor: primary }}
    >
      <View className="flex-row items-center">
        <IonIcon
          name="chevron-back"
          size={24}
          color={background}
          // onPress={() => BackHandler.goBack?.()}
        />
        <Text className="text-xl font-bold ml-2" style={{ color: background }}>
          {name}
        </Text>
      </View>
      {search && <IonIcon name="search" size={24} color={background} />}
    </View>
  );
};

export default TopBar;
