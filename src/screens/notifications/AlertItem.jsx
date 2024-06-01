import { Pressable, Text, View } from "react-native";
import tw from "twrnc";
import IonIcon from "@expo/vector-icons/Ionicons";
import { primary } from "../../utils/common";
import moment from "moment";
import { readAlertAPI } from "../../api/notification";

const AlertItem = ({ alert, navigation }) => {
  const {
    unread,
    user,
    group,
    time,
    amount,
    purpose,
    prevAmount,
    prevPurpose,
    _id,
  } = alert || {};

  const onPress = async () => {
    try {
      await readAlertAPI(_id);
      navigation.navigate("Expenses", { data: group });
    } catch (error) {}
  };

  return (
    <Pressable
      style={tw`bg-[${
        unread ? "#defff7" : "#ffffff"
      }] p-2 py-3 border-b border-gray-300 flex flex-row items-center gap-3`}
      onPress={onPress}
    >
      <View style={tw`bg-[${primary}] p-3 rounded-full`}>
        <IonIcon name="notifications" size={20} color="white" />
      </View>
      <View style={tw`w-[${unread ? 77 : 85}%]`}>
        <Text style={tw`mb-1`}>
          <Text style={tw`font-semibold`}>{user}</Text> has edited an expense
          from <Text style={tw`font-semibold`}>{group?.name}</Text>
        </Text>
        <View style={tw`flex flex-row items-center flex-wrap`}>
          <View style={tw`flex flex-row items-center gap-1 mr-2`}>
            <IonIcon name="arrow-back" color="red" />
            <Text>
              {prevPurpose} -&nbsp;
              <Text style={tw`font-semibold`}>₹{prevAmount}</Text>
            </Text>
          </View>
          <View style={tw`flex flex-row items-center gap-1`}>
            <IonIcon name="arrow-forward" color="green" />
            <Text>
              {purpose}&nbsp;- <Text style={tw`font-semibold`}>₹{amount}</Text>
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center gap-1 mt-1`}>
          <IonIcon name="time" color="gray" />
          <Text style={tw`text-xs`}>
            {moment(time)?.format("hh:mm A DD/MM/YY")}
          </Text>
        </View>
      </View>
      {unread && <View style={tw`bg-[${primary}] p-1 rounded-full`} />}
    </Pressable>
  );
};
export default AlertItem;
