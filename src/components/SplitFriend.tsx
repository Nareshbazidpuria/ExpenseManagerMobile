import { Pressable, Text, View } from 'react-native';
import Avatar from './Avatar';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { primary } from '../utils/global';
import React from 'react';

interface SplitFriendProps {
  og?: string;
  value?: string;
  id?: string;
  selected?: string[];
  amount?: number;
  setSelected?: React.Dispatch<React.SetStateAction<string[]>>;
  percentage?: number;
}

const SplitFriend: React.FC<SplitFriendProps> = ({
  og = '',
  value = '',
  id = '',
  selected = [],
  amount = 0,
  setSelected = () => {},
  percentage = 50,
}) => {
  const onPress = () => {
    selected.includes(id)
      ? setSelected([...selected].filter(e => e !== id))
      : setSelected(prev => [...prev, id]);
  };

  return (
    <Pressable
      className="flex flex-row items-center justify-between gap-2 my-1"
      onPress={onPress}
    >
      <View className="flex flex-row items-center gap-2">
        <Avatar value={value} w={40} />
        <Text className="text-lg font-semibold">
          {og || value?.trim().split(' ')[0]}
        </Text>
      </View>
      {selected.includes(id) && (
        <View className="flex flex-row gap-1 items-center">
          <Text className="text-sm">
            {(amount * (percentage / 100)).toFixed(2)}
          </Text>
          <Text className="text-sm text-gray-500">
            ({(100 * (percentage / 100)).toFixed(1)}%)
          </Text>
          <IonIcon name="checkmark-circle" size={24} color={primary} />
        </View>
      )}
    </Pressable>
  );
};

export default SplitFriend;
