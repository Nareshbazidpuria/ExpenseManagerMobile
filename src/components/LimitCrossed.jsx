import { Text, View } from "react-native";
import tw from "twrnc";
import Bicon from "./Bicon";
import IonIcon from "@expo/vector-icons/Ionicons";

const LimitCrossed = ({ setContent, message }) => (
  <View style={tw`py-2 px-5`}>
    <IonIcon
      name="information-circle"
      color="orange"
      style={tw`text-center mb-2`}
      size={50}
    />
    <Text style={tw`text-center font-bold text-lg mb-5`}>{message}</Text>
    <Bicon
      title="Ok"
      cls="w-full"
      txtCls="font-bold text-base"
      onPress={() => setContent(null)}
    />
  </View>
);

export default LimitCrossed;
