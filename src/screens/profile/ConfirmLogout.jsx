import { Text, View } from "react-native";
import tw from "twrnc";
import Bicon from "../../components/Bicon";

const ConfirmLogout = ({ setContent, logout }) => (
  <View style={tw`p-2`}>
    <Text style={tw`text-center font-bold text-lg my-5`}>
      Are you sure you want to logout ?
    </Text>
    <View style={tw`flex flex-row justify-between mt-2`}>
      <Bicon
        title="No"
        cls="w-[48%]"
        bg="#ffffff"
        txtCls="font-bold text-base"
        onPress={() => setContent(null)}
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
