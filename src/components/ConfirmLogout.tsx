import { Text, View } from 'react-native';
import Bicon from './Bicon';
import { primary } from '../utils/global';

const ConfirmLogout = ({ setContent, logout }) => (
  <View className={`py-2 px-6`}>
    <Text className={`text-center font-bold text-lg my-5`}>
      Are you sure you want to logout ?
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
