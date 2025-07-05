import { Dimensions, Pressable, Text, View } from 'react-native';
import { useState } from 'react';
import { primary } from '../utils/global';

const Info = ({}) => {
  const [visible, setVisible] = useState(1);

  return visible ? (
    <View
      className={`absolute w-full flex items-center justify-center bg-[#00000055] h-${
        Dimensions.get('window').height / 4
      }`}
    >
      <View
        className={`bg-white w-[${
          (Dimensions.get('window').width * 0.8) / 4
        }] shadow rounded`}
      >
        <View className={`py-2 px-8`}>
          <Text className={`font-bold text-center text-base`}>Info</Text>
          <Text className={`text-center my-2`}>
            If there are only two members in a group, it will act as a personal
            chat and total expenses will not be divided. Also group name will be
            shown as the name of another member.
          </Text>
        </View>
        <Pressable onPress={() => setVisible(false)}>
          <Text
            className={`text-[${primary}] font-bold text-center p-2 border-t border-[${primary}] text-base`}
          >
            OK
          </Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <></>
  );
};

export default Info;
