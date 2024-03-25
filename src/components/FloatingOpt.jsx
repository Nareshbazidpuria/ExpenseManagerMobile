import { Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { expenseTypes, primary } from "../utils/common";

const FloatingOpt = ({ type }) => (
  <View
    style={tw`flex flex-row items-center gap-1 bg-[${primary}] py-1 px-2 rounded-md`}
  >
    <Text style={tw`text-white font-semibold`}>
      {type === expenseTypes.own ? "Your own" : "To the team"}
    </Text>
    <IonIcon
      style={tw`text-3xl text-white`}
      name={`${type === expenseTypes.own ? "person" : "people"}-circle-outline`}
    />
  </View>
);

export default FloatingOpt;
