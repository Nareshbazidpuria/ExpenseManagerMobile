import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import tw from "twrnc";
import Bicon from "../../components/Bicon";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { primary } from "../../utils/common";
import { groupListAPI } from "../../api/group";

const HiddenGroups = ({ setContent, hiddenGroups, unhide }) => {
  const [selected, setSelected] = useState([]),
    [list, setList] = useState([]),
    [loading, setLoading] = useState();

  const groupList = async () => {
    let data = [];
    try {
      setLoading(true);
      setSelected([]);
      const res = await groupListAPI({ hiddenGroups });
      if (res?.status === 200) data = res?.data?.data;
    } catch (error) {
      console.log(error?.data || error);
    } finally {
      setLoading(false);
      setList(data);
    }
  };

  useEffect(() => {
    groupList();
  }, [hiddenGroups]);

  return (
    <View style={tw`p-2`}>
      {hiddenGroups.length ? (
        <View>
          <Text style={tw`text-center font-bold text-lg`}>Hidden Groups</Text>
          <ScrollView style={tw`max-h-70`}>
            {loading ? (
              <View style={tw`p-20`}>
                <ActivityIndicator color={primary} size={50} />
              </View>
            ) : (
              list.map(({ _id, name }, i) => (
                <Pressable
                  key={"hidden-groups-" + i}
                  style={tw`flex flex-row justify-between p-2 bg-green-50 rounded mb-1`}
                  onPress={
                    selected.includes(_id)
                      ? setSelected.bind(
                          {},
                          [...selected].filter((id) => id !== _id)
                        )
                      : setSelected.bind({}, [...selected, _id])
                  }
                >
                  <Text>{name}</Text>
                  <Ionicons
                    name={
                      selected.includes(_id) ? "ellipse" : "ellipse-outline"
                    }
                    style={tw`text-[${primary}]`}
                    size={20}
                  />
                </Pressable>
              ))
            )}
          </ScrollView>
          <View style={tw`flex flex-row justify-between mt-2`}>
            <Bicon
              title="Cancel"
              cls="w-[48%]"
              bg="#ffffff"
              txtCls="font-bold text-base"
              onPress={() => setContent(null)}
            />
            <Bicon
              title="Make Visible"
              cls="w-[48%]"
              txtCls="font-bold text-base"
              disabled={!selected.length}
              onPress={unhide.bind({}, selected)}
            />
          </View>
        </View>
      ) : (
        <View style={tw`mx-5`}>
          <Text style={tw`text-center font-bold text-lg mb-5`}>
            You don't have any hidden group!
          </Text>
          <Bicon
            title="Ok"
            cls="w-full"
            txtCls="font-bold text-base"
            onPress={setContent.bind({}, null)}
          />
        </View>
      )}
    </View>
  );
};

export default HiddenGroups;
