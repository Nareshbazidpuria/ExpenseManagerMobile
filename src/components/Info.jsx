import { Dimensions, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { primary } from "../utils/common";
import { useState } from "react";

const Info = ({ params }) => {
  const [visible, setVisible] = useState(1);

  return visible ? (
    <View
      style={tw`absolute w-full flex items-center justify-center bg-[#00000055] h-${
        Dimensions.get("window").height / 4
      }`}
    >
      <View
        style={tw`bg-white w-[${
          (Dimensions.get("window").width * 0.8) / 4
        }] shadow rounded`}
      >
        <View style={tw`py-2 px-8`}>
          <Text style={tw`font-bold text-center text-base`}>Info</Text>
          <Text style={tw`text-center my-2`}>
            If there are only two members in a group, it will act as a personal
            chat and total expenses will not be divided. Also group name will be
            shown as the name of another member.
          </Text>
        </View>
        <Pressable onPress={() => setVisible(false)}>
          <Text
            style={tw`text-[${primary}] font-bold text-center p-2 border-t border-[${primary}] text-base`}
          >
            OK
          </Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <></>
  );
};

export default Info;
