import moment from "moment";
import { Text, View } from "react-native";
import tw from "twrnc";
import Avatar from "./Avatar";
import IonIcon from "@expo/vector-icons/Ionicons";

const PurchageItem = ({ data }) => (
  <View
    style={tw`py-3 px-2 shadow bg-white m-1 mb-0 rounded flex flex-row items-center justify-between`}
  >
    <View style={tw`flex flex-row items-center gap-2`}>
      <Avatar value={data?.user?.name?.[0]} />
      <View>
        <View style={tw`flex flex-row items-center gap-1`}>
          <Text style={tw`font-semibold`}>{data?.purpose}</Text>
          {data?.edited && (
            <>
              <IonIcon color="gray" name="pencil" style={tw`ml-2`} />
              <Text style={tw`font-light text-xs`}>Edited</Text>
            </>
          )}
        </View>
        <Text style={tw`text-xs`}>
          {moment(data?.createdAt)?.format("hh:mm A DD/MM/YY")}
        </Text>
      </View>
    </View>
    <Text style={tw`text-xl font-semibold`}>₹{data?.amount}</Text>
  </View>
);

export default PurchageItem;
