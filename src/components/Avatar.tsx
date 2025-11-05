import { Dimensions, Image, Modal, Pressable, Text, View } from 'react-native';
import n from '../assets/n.gif';
import Partner from '../assets/Partner.jpg';
import Popup from './Popup';
import React, { useState } from 'react';
import { primary } from '../utils/global';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Avatar: React.FC<{ value?: string; w?: number }> = ({
  value = '',
  w = 50,
}) => {
  const originalValue = value?.trim?.();
  value = value
    .split(' ')
    .map(chars => chars?.[0])
    .join('');

  const [visible, setVisible] = useState<boolean>(false);

  const renderAvatar = (value: string, w: number) => (
    <Pressable
      onPress={() => setVisible(true)}
      className=" flex items-center justify-center"
    >
      {['Nᴀʀᴇsʜ Bᴀᴢɪᴅᴘᴜʀɪᴀ', 'Naresh Bazidpuria', 'Tanvi Negi'].includes(
        originalValue,
      ) ? (
        <View
          className="rounded-full overflow-hidden border"
          style={{ borderColor: primary, height: w, width: w }}
        >
          <Image
            source={originalValue === 'Tanvi Negi' ? Partner : n}
            className="rounded-full"
            style={{ width: w, height: w }}
          />
        </View>
      ) : (
        <View
          className="rounded-full flex justify-center items-center border"
          style={{
            width: w,
            height: w,
            backgroundColor:
              { S: '#6e0b65', SN: '#6e0b65', HB: '#0f4bab', H: '#0f4bab' }[
                value
              ] || primary,
            borderColor:
              { S: '#6e0b65', SN: '#6e0b65', HB: '#0f4bab', H: '#0f4bab' }[
                value
              ] || primary,
          }}
        >
          <Text
            className="font-bold text-white text-center"
            style={{ fontSize: w / 2.5 }}
          >
            {value?.substring(0, 2)}
          </Text>
        </View>
      )}
    </Pressable>
  );
  return (
    <>
      {renderAvatar(value, w)}
      {visible && (
        <Modal animationType="slide" transparent={true} visible={visible}>
          <View
            className={`bg-[#00000055] flex items-center pb-16 justify-center`}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height,
            }}
          >
            <View
              style={{
                width: Dimensions.get('screen').width - 40,
                height: Dimensions.get('screen').width,
              }}
              className={`bg-white rounded shadow`}
            >
              <IonIcon
                name="close"
                size={28}
                color={'gray'}
                className="absolute right-2 top-2 z-10"
                onPress={() => setVisible(false)}
              />
              <View className="flex justify-between h-full items-center">
                <Text className="flex items-center p-5 h-[90%]">
                  {renderAvatar(value, Dimensions.get('screen').width - 80)}
                </Text>
                <View className="w-full h-[10%] bg-[#00000020] flex justify-center">
                  <Text className="text-center text-lg">{originalValue}</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default Avatar;
