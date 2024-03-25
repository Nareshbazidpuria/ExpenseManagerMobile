import moment from "moment";
import { Text, View } from "react-native";
import tw from "twrnc";
import Avatar from "./Avatar";

const PurchageItem = ({ data }) => (
  <View
    style={tw`py-3 px-2 shadow bg-white m-1 mb-0 rounded flex flex-row items-center justify-between`}
  >
    <View style={tw`flex flex-row items-center gap-2`}>
      <Avatar value={data?.user?.name?.[0]} />
      <View>
        <Text style={tw`font-semibold`}>₹{data?.amount}</Text>
        <Text>{data?.purpose}</Text>
      </View>
    </View>
    <View>
      <Text style={tw`text-xs`}>
        {moment(data?.createdAt)?.format("hh:mm A")}
      </Text>
      <Text style={tw`text-xs`}>
        {moment(data?.createdAt)?.format(" DD/MM/YY")}
      </Text>
    </View>
  </View>
);

export default PurchageItem;
