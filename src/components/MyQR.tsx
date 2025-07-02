import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { backgroundLight } from '../utils/global';

interface MyQRProps {}

const MyQR: React.FC<MyQRProps> = ({}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <View
        className="relative p-5 pb-10 flex jucstify-center items-center mb-28"
        style={{ backgroundColor: backgroundLight }}
      >
        <Image
          source={require('../assets/Partner.jpg')}
          className="w-24 h-24 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4"
          style={{ borderColor: backgroundLight }}
        />
        <Text className="text-2xl font-bold text-center mb-5 mt-8">
          Naresh Bazidpuria
        </Text>
        <Text className="text-center text-gray-600 mb-5">
          Scan this QR code to connect with me on the app!
        </Text>
        <View className="bg-white rounded-lg shadow-lg p-5 w-full">
          <QRCode
            value="http://awesome.link.qr"
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
