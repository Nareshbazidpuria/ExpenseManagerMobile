import { Dimensions, Text, View } from 'react-native';
import Avatar from './Avatar';

const Member = ({ value, name }) => (
  <View
    className="flex flex-row items-center justify-center relative"
    style={{ width: Dimensions.get('screen').width / 4 - 16 }}
  >
    <View className="flex items-center gap-1">
      <Avatar value={value || name} w={60} />
      <Text numberOfLines={1} className="w-16 text-center">
        {name}
      </Text>
    </View>
  </View>
);

export default Member;
