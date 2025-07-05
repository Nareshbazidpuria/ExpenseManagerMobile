import React, { useEffect } from 'react';
import { Alert, Linking, Platform, Text, View, StyleSheet } from 'react-native';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import Bicon from './Bicon';
import { screens } from '../utils/global';

const ScanQR: React.FC = ({ navigation }) => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  const openAppSettings = () => {
    if (Platform.OS === 'ios') Linking.openURL('app-settings:');
    else Linking.openSettings();
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      navigation?.navigate(screens.CreateGroup, {
        code: codes[0].value?.replace('expense-manager-secret-code-', ''), // Use the first scanned code
      });
    },
  });

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission]);

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
    </View>
  ) : (
    <View className="flex-1 items-center justify-center">
      <Camera
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
      />

      {/* Scanner box overlay */}
      <View className="absolute top-1/3 w-full items-center justify-center">
        <View className="w-64 h-64 border-2 border-white rounded-xl" />
        <Text className="text-white mt-4 text-base">
          Align QR code within the box
        </Text>
      </View>
    </View>
  );
};

export default ScanQR;
