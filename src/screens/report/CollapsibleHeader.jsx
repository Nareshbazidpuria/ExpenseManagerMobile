import { Pressable, Text, View } from "react-native";
import tw from "twrnc";
import IonIcon from "@expo/vector-icons/Ionicons";
import { primary } from "../../utils/common";

const CollapsibleHeader = ({ col, setCol, Key, title }) => {
  return (
    <>
      <Pressable
        onPress={() =>
          setCol({
            ...col,
            [Key]: !(col?.[Key] || !col?.hasOwnProperty?.(Key)),
          })
        }
        style={tw`p-2 bg-[${primary}] flex flex-row justify-between items-center mt-2`}
      >
        <Text style={tw`text-white text-base font-semibold`}>{title}</Text>
        <View style={tw`flex flex-row gap-2 items-center`}>
          <IonIcon
            style={tw`text-base text-white`}
            name={`chevron-${
              col?.[Key] || !col?.hasOwnProperty?.(Key) ? "forward" : "down"
            }-outline`}
          />
        </View>
      </Pressable>
    </>
  );
};

export default CollapsibleHeader;
