import { Pressable, Text, View } from "react-native";
import Avatar from "../../components/Avatar";
import tw from "twrnc";

const Group = ({ data, navigation }) => (
  <Pressable
    style={tw`flex flex-row gap-3 items-center justify-between py-2 px-4 m-1 rounded bg-white shadow`}
    onPress={() => navigation.navigate("Home", { data })}
  >
    <Text style={tw`font-semibold text-xl`}>{data?.name}</Text>
    <View style={tw`flex flex-row gap-3 items-center`}>
      {data?.members?.map((name) => (
        <Avatar value={name} w="12" />
      ))}
    </View>
  </Pressable>
);

export default Group;
