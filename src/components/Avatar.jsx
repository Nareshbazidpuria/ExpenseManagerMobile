import { Image, Text, View } from "react-native";
import tw from "twrnc";
import { primary } from "../utils/common";
import n from "../assets/n.jpg";

const Avatar = ({ value }) =>
  value === "N" ? (
    <Image
      source={n}
      style={tw`h-10 w-10 rounded-full border border-[${primary}]`}
    />
  ) : (
    <View
      style={tw`bg-[${
        value === "S" ? "#0b6e4f" : primary
      }] h-10 w-10 rounded-full flex justify-center items-center`}
    >
      <Text style={tw`text-xl font-bold text-white`}>{value}</Text>
    </View>
  );

export default Avatar;
