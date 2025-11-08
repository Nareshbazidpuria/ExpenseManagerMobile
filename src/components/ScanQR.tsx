import React, { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  Text,
  View,
  StyleSheet,
  BackHandler,
  NativeModules,
} from 'react-native';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import Bicon from './Bicon';
import { isValidObjectId, screens } from '../utils/global';
import { useIsFocused } from '@react-navigation/native';
import { addFriendAPI } from '../api/group';
import { message } from '../utils/common';

const { IosBackHandler } = NativeModules;

const ScanQR: React.FC<{ navigation: any }> = ({
  navigation,
}: {
  navigation: any;
}) => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isActive, setIsActive] = useState<boolean>(true);
  const isFocused = useIsFocused();
  const [scannedId, setScannedId] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const handleBack = () => {
    setVisible(false);
    if (navigation.canGoBack()) navigation.goBack();
    else
      Platform.OS === 'ios'
        ? IosBackHandler?.exitApp?.()
        : BackHandler.exitApp();
  };

  const openAppSettings = () => {
    if (Platform.OS === 'ios') Linking.openURL('app-settings:');
    else Linking.openSettings();
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      setIsActive(false);
      const id = codes[0]?.value?.replace('expense-manager-id-', '') || '';
      if (!isValidObjectId.test(id)) setVisible(true);
      else setScannedId(id);
    },
  });

  useEffect(() => {
    if (!hasPermission) requestPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  useEffect(() => {
    if (isFocused) setIsActive(true);
    else {
      setIsActive(false);
      setScannedId('');
    }
  }, [isFocused]);

  const addFriend = async () => {
    try {
      const res = await addFriendAPI(scannedId);
      if (res?.status === 200) {
        navigation.navigate(screens.Tabs);
        message(res?.data?.message || 'Friend added successfully');
      } else res?.data?.message && message(res?.data?.message, 'error');
    } catch (error: any) {
      console.log(error);
      if (error?.data?.message)
        Alert.alert('Oops! Try again', error.data.message, [
          { text: 'Back', style: 'cancel', onPress: handleBack },
          {
            text: 'Scan Again',
            onPress: () => {
              setIsActive(true);
              setVisible(false);
            },
          },
        ]);
    } finally {
      setScannedId('');
    }
  };

  useEffect(() => {
    if (scannedId) addFriend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scannedId]);

  useEffect(() => {
    visible &&
      Alert.alert(
        'Invalid QR Code',
        'The scanned QR code is not valid. Please try again.',
        [
          { text: 'Back', style: 'cancel', onPress: handleBack },
          {
            text: 'Scan Again',
            onPress: () => {
              setIsActive(true);
              setVisible(false);
            },
          },
        ],
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return !hasPermission || !device ? (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-lg font-semibold mb-2 text-gray-800">
        Camera Permission Denied
      </Text>
      <Text className="text-center text-gray-600">
        Please allow camera access to scan QR codes.
      </Text>
      <Bicon
        cls="mt-4"
        title="Request Camera Permission"
        onPress={async () => {
          const newPerm = await requestPermission();
          if (!newPerm) {
            Alert.alert(
              'Permission Required',
              'Please enable camera permission from settings.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: openAppSettings },
              ],
            );
          }
        }}
      />
      <Text className="text-center text-gray-600 mt-4">OR</Text>
      <Bicon
        cls="mt-4"
        title="Connect Manually"
        onPress={() => navigation.navigate(screens.AddFriend)}
      />
    </View>
  ) : (
    <View className="flex-1 items-center justify-center">
      <Camera
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={isActive}
      />

      {/* Scanner box overlay */}
      <View className="absolute top-1/3 w-full items-center justify-center">
        <View className="w-64 h-64 border-2 border-white rounded-xl" />
        <Text className="text-white mt-4 text-base">
          Align QR code within the box
        </Text>
        <Text className="text-center text-white mt-4">OR</Text>
        <Bicon
          cls="mt-4"
          title="Connect Manually"
          onPress={() => navigation.navigate(screens.AddFriend)}
        />
      </View>
    </View>
  );
};

export default ScanQR;
