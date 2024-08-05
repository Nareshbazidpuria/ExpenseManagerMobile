import { Pressable, Text, View } from "react-native";
import Avatar from "../../components/Avatar";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import { primary } from "../../utils/common";

const Group = ({ data, navigation, selected, setSelected }) => {
  const name = data?.memberss?.length ? data.memberss[0].name : "";
  return (
    <Pressable
      style={tw`flex flex-row gap-2 items-center py-2 px-3 ${
        selected.includes(data._id) ? "bg-green-100" : "bg-white"
      } border-b border-gray-200`}
      onPress={() =>
        selected.length
          ? selected.includes(data._id)
            ? setSelected([...selected].filter((id) => id !== data._id))
            : setSelected([...selected, data._id])
          : navigation.navigate("Expenses", { data })
      }
      onLongPress={setSelected.bind({}, [...selected, data._id])}
    >
      <Avatar value={name || data?.admin} w="12" />
      <View style={tw`flex flex-row justify-between w-[82%] items-center`}>
        <View style={tw`w-[70%]`}>
          <Text style={tw`font-semibold text-lg`}>{name || data?.name}</Text>
          {!name && (
            <Text style={tw`font-semibold text-gray-400`}>
              Admin: {data?.admin}
            </Text>
          )}
        </View>

        {selected.includes(data._id) ? (
          <Ionicons
            name="checkmark-circle"
            size={28}
            style={tw`text-[${primary}]`}
          />
        ) : (
          !name && (
            <Text style={tw`font-semibold text-gray-400`}>
              {data?.members?.length} members
            </Text>
          )
        )}
      </View>
    </Pressable>
  );
};

export default Group;
