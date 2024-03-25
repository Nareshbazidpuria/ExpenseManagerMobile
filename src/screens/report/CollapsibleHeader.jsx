import { Pressable, Text } from "react-native";
import tw from "twrnc";
import IonIcon from "@expo/vector-icons/Ionicons";
import { primary } from "../../utils/common";

const CollapsibleHeader = ({ col, setCol, Key, title }) => (
  <Pressable
    onPress={() => setCol({ ...col, [Key]: !col?.[Key] })}
    style={tw`p-2 bg-[${primary}] flex flex-row justify-between items-center mt-2`}
  >
    <Text style={tw`text-white text-base`}>{title}</Text>
    <IonIcon
      style={tw`text-base text-white`}
      name={`chevron-${col?.[Key] ? "forward" : "down"}-outline`}
    />
  </Pressable>
);

export default CollapsibleHeader;
