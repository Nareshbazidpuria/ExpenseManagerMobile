import { Text, View } from 'react-native';
import Avatar from './Avatar';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Member = ({ value, name, close }) => (
  <View className={`flex flex-row my-1 items-center justify-between my-1 mx-2`}>
    <View className={`flex flex-row items-center gap-2`}>
      <Avatar value={value || name} />
      <Text className={`font-bold text-base`}>{name}</Text>
    </View>
    {close && <IonIcon name="close" size={18} onPress={close} />}
  </View>
);

export default Member;
