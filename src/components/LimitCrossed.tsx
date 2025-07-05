import { Text, View } from 'react-native';
import Bicon from './Bicon';
import IonIcon from 'react-native-vector-icons/Ionicons';

const LimitCrossed = ({ setContent, message }) => (
  <View className={`py-2 px-5`}>
    <IonIcon
      name="information-circle"
      color="orange"
      className={`text-center mb-2`}
      size={50}
    />
    <Text className={`text-center font-bold text-lg mb-5`}>{message}</Text>
    <Bicon
      title="Ok"
      cls="w-full"
      txtCls="font-bold text-base"
      onPress={() => setContent(null)}
    />
  </View>
);

export default LimitCrossed;
