import { Pressable, Text, View } from 'react-native';
import Avatar from './Avatar';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Member = ({ value, name, close }) => (
  <View className="flex flex-row items-center relative">
    <View className="flex items-center gap-1">
      <Avatar value={value || name} w={60} />
      <Text numberOfLines={1} className="w-16 text-center">
        {name}
      </Text>
    </View>
    {close && (
      <Pressable
        className="flex items-center justify-center bg-gray-100 absolute -top-1 -right-1 rounded-full"
        onPress={close}
      >
        <IonIcon name="close" size={18} />
      </Pressable>
    )}
  </View>
);

export default Member;
