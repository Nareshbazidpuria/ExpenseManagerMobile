import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { backgroundLight } from '../utils/global';

interface MyQRProps {}

const MyQR: React.FC<MyQRProps> = ({}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <View
        className="p-5 pb-10 flex justify-center items-center mb-28"
        style={{ backgroundColor: backgroundLight }}
      >
        <View className="absolute -top-12">
          <Image
            source={require('../assets/Partner.jpg')}
            className="w-24 h-24 rounded-full border-4 border-white"
            style={{ borderColor: backgroundLight }}
          />
        </View>
        <Text className="text-2xl font-bold text-center mb-5 mt-10">
          Tanvi Negi
        </Text>
        <Text className="text-center text-gray-600 mb-5">
          Scan this QR code to connect with me on the app!
        </Text>
        <View className="bg-white rounded-lg shadow-lg p-5 w-full">
          <QRCode
            value="expense-manager-secret-code-37IT4WS3QMO"
            size={Dimensions.get('window').width - 200}
            logo={require('../assets/favicon.png')}
            logoSize={60}
            logoBorderRadius={30}
          />
        </View>
      </View>
      <Text className="text-gray-500 text-sm mt-5">
        Share this QR code with others to connect easily!
      </Text>
    </View>
  );
};

export default MyQR;
