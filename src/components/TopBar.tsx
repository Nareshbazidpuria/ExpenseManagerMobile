import * as React from 'react';
import { BackHandler, NativeModules, Platform, Text, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { background, primary } from '../utils/global';
import { useNavigation } from '@react-navigation/native';

const { IosBackHandler } = NativeModules;

const TopBar: React.FC<{
  back?: boolean;
  name: string | React.ReactNode;
  search?: boolean;
  extra?: React.ReactNode;
}> = ({ name, search, extra, back = true }) => {
  const navigation = useNavigation();
  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else
      Platform.OS === 'ios'
        ? IosBackHandler?.exitApp?.()
        : BackHandler.exitApp();
  };

  return (
    <View
      className="flex-row justify-between items-center pl-2 pr-4 py-3"
      style={{ backgroundColor: primary }}
    >
      <View className="flex-row items-center">
        {back && (
          <IonIcon
            name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
            size={24}
            color={background}
            // onPress={() => BackHandler.goBack?.()}
            onPress={handleBack}
          />
        )}
        <Text className="text-xl font-bold ml-2" style={{ color: background }}>
          {name}
        </Text>
      </View>
      {search && <IonIcon name="search" size={24} color={background} />}
      {extra}
    </View>
  );
};

export default TopBar;
