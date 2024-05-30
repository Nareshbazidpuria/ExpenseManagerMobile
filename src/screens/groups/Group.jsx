import { Pressable, Text, View } from "react-native";
import Avatar from "../../components/Avatar";
import tw from "twrnc";

const Group = ({ data, navigation }) => (
  <Pressable
    style={tw`flex flex-row gap-2 items-center py-2 px-3 bg-white border-b border-gray-200`}
    onPress={() => navigation.navigate("Expenses", { data })}
  >
    <Avatar value={data?.admin} w="12" />
    <View style={tw`flex flex-row justify-between w-[82%] items-center`}>
      <View style={tw`w-[70%]`}>
        <Text style={tw`font-semibold text-lg`}>{data?.name}</Text>
        <Text style={tw`font-semibold text-gray-400`}>
          Admin: {data?.admin}
        </Text>
      </View>
      <Text style={tw`font-semibold text-gray-400`}>
        {data?.members?.length} members
      </Text>
    </View>
  </Pressable>
);

export default Group;
