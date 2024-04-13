import { Text, View } from "react-native";
import tw from "twrnc";
import Avatar from "./Avatar";
import moment from "moment";

const IndividualItem = ({ avatar, e }) => (
  <View style={tw`flex flex-row items-center gap-2 min-w-1/2 my-1`}>
    <Avatar value={avatar} />
    <View>
      <View style={tw`flex flex-row items-center gap-2`}>
        <Text>{e?.purpose}:</Text>
        <Text style={tw`font-semibold text-base`}>₹{e?.amount}</Text>
      </View>
      <Text style={{ fontSize: 11 }}>
        {moment(e?.createdAt).format("hh:mm A DD-MM-YY")}
      </Text>
    </View>
  </View>
);

export default IndividualItem;
