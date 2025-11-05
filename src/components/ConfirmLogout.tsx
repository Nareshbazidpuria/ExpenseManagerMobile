import { Text, View } from 'react-native';
import Bicon from './Bicon';
import { primary } from '../utils/global';
import IonIcon from 'react-native-vector-icons/Ionicons';

const ConfirmLogout = ({ setContent, logout }) => (
  <View className="px-6 py-4">
    <IonIcon
      name="log-out-outline"
      size={50}
      className="text-center mb-4"
      color={primary}
    />
    <Text className={`text-center font-bold text-lg mb-4`}>
      Are you sure you want to logout?
    </Text>
    <View className={`flex flex-row justify-between mt-2`}>
      <Bicon
        title="No"
        cls="w-[48%]"
        bg="#ffffff"
        txtCls="font-bold text-base"
        onPress={() => setContent(null)}
        borderColor={primary}
      />
      <Bicon
        title="Yes"
        cls="w-[48%]"
        txtCls="font-bold text-base"
        onPress={logout}
      />
    </View>
  </View>
);

export default ConfirmLogout;
