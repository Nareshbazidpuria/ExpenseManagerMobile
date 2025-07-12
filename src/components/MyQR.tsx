import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { backgroundLight } from '../utils/global';
import { useSelector } from 'react-redux';
import Avatar from './Avatar';

const MyQR: React.FC = () => {
  const { authUser } = useSelector(state => state);

  return (
    <View className="flex-1 items-center justify-center">
      <View
        className="p-5 pb-10 flex justify-center items-center mb-28"
        style={{ backgroundColor: backgroundLight }}
      >
        <View className="absolute -top-12">
          <View
            className="w-24 h-24 rounded-full border-4 border-white flex justify-center items-center"
            style={{ borderColor: backgroundLight }}
          >
            <Avatar value={authUser?.name} w={80} />
          </View>
        </View>
        <Text className="text-2xl font-bold text-center mb-5 mt-10">
          {authUser?.name}
        </Text>
        <Text className="text-center text-gray-600 mb-5">
          Scan this QR code to connect with me on the app!
        </Text>
        <View className="bg-white rounded-lg shadow-lg p-5 w-full">
          <QRCode
            value={`expense-manager-secret-code-${authUser?.secretCode}`}
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
