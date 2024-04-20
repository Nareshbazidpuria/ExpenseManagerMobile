import { Image, Text, View } from "react-native";
import tw from "twrnc";
import { primary } from "../utils/common";
import n from "../assets/n.gif";

const Avatar = ({ value, w = 10 }) =>
  ["N", "NB"].includes(value) ? (
    <View style={tw`rounded-full overflow-hidden border border-[${primary}]`}>
      <Image source={n} style={tw`h-[${w}] w-[${w}] rounded-full `} />
    </View>
  ) : (
    <View
      style={tw`bg-[${
        { S: "#6e0b65", SN: "#6e0b65", HB: "#0f4bab", H: "#0f4bab" }[value] ||
        primary
      }] h-[${w}] w-[${w}] rounded-full flex justify-center items-center`}
    >
      <Text style={tw`text-xl font-bold text-white`}>{value}</Text>
    </View>
  );

export default Avatar;
