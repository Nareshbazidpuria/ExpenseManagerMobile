import moment from "moment";
import { Text, View } from "react-native";
import { primary } from "../utils/common";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";

const TopBar = ({ date, setDate, cls = "" }) => (
  <View
    style={tw`flex flex-row items-center justify-between p-2 bg-[${primary}] ${cls}`}
  >
    <IonIcon
      style={tw`text-xl text-white w-5`}
      name="chevron-back-outline"
      onPress={() => setDate(moment(date).subtract(1, "month"))}
    />
    <Text style={tw`text-xl text-white font-semibold`}>
      {moment(date).format("MMM YYYY")}
    </Text>
    {moment(date).startOf("month").toString() !==
    moment().startOf("month").toString() ? (
      <IonIcon
        style={tw`text-xl text-white w-5 text-right`}
        name="chevron-forward-outline"
        onPress={() => setDate(moment(date).add(1, "month"))}
      />
    ) : (
      <Text style={tw`w-5`}></Text>
    )}
  </View>
);

export default TopBar;
