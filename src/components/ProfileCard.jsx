import { Pressable, Text } from "react-native";
import Avatar from "./Avatar";
import tw from "twrnc";

const ProfileCard = ({ value, name, onPress }) => (
  <Pressable
    style={tw`flex flex-row my-2 items-center gap-2`}
    onPress={onPress}
  >
    <Avatar value={value} />
    <Text style={tw`font-bold text-base`}>{name}</Text>
  </Pressable>
);

export default ProfileCard;
