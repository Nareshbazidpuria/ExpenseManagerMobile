import { Pressable, Text, View } from "react-native";
import tw from "twrnc";
import IonIcon from "@expo/vector-icons/Ionicons";

const ProfileOpt = ({ label, icon, onPress, value }) => (
  <Pressable
    style={tw`px-5 py-2 border-b border-gray-300 flex flex-row items-center gap-5`}
    onPress={onPress}
  >
    <IonIcon name={icon} size={20} />
    <View>
      <Text style={tw`font-semibold`}>{label}</Text>
      {value && (
        <Text selectable={true} style={tw`text-gray-500 text-xs`}>
          {value}
        </Text>
      )}
    </View>
  </Pressable>
);
export default ProfileOpt;
