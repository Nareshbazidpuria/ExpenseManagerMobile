import { Text, View } from "react-native";
import Avatar from "./Avatar";
import tw from "twrnc";
import IonIcon from "@expo/vector-icons/Ionicons";

const Member = ({ value, name, close }) => (
  <View style={tw`flex flex-row my-1 items-center justify-between`}>
    <View style={tw`flex flex-row items-center gap-2`}>
      <Avatar value={value || name} />
      <Text style={tw`font-bold text-base`}>{name}</Text>
    </View>
    <IonIcon name="close" size={18} onPress={close} />
  </View>
);

export default Member;
