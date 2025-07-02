import React from 'react';
import { Text, View } from 'react-native';

interface MyQRProps {}

const ScanQR: React.FC<MyQRProps> = ({}) => {
  return (
    <View>
      <Text>Scan QR Code</Text>
    </View>
  );
};

export default ScanQR;
