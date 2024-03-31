import { Pressable, Text, View } from "react-native";
import tw from "twrnc";
import IonIcon from "@expo/vector-icons/Ionicons";
import { primary } from "../../utils/common";
import AddExpense from "../../components/AddExpense";
import { useEffect, useState } from "react";

const CollapsibleHeader = ({ col, setCol, Key, title, to, setRefresh }) => {
  const [visible, setVisible] = useState();

  useEffect(() => {
    if (!visible) {
    }
  }, [visible]);

  return (
    <>
      <Pressable
        onPress={() => setCol({ ...col, [Key]: !col?.[Key] })}
        style={tw`p-2 bg-[${primary}] flex flex-row justify-between items-center mt-2`}
      >
        <Text style={tw`text-white text-base font-semibold`}>{title}</Text>
        <View style={tw`flex flex-row gap-2`}>
          {to && (
            <Pressable
              style={tw`bg-white rounded-full w-6 h-6 `}
              onPress={(e) => {
                e?.stopPropagation();
                setVisible(to);
              }}
            >
              <IonIcon
                style={tw`text-base text-center text-[${primary}]`}
                name="add"
              />
            </Pressable>
          )}
          <IonIcon
            style={tw`text-base text-white`}
            name={`chevron-${col?.[Key] ? "forward" : "down"}-outline`}
          />
        </View>
      </Pressable>
      <AddExpense
        visible={visible}
        setVisible={setVisible}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default CollapsibleHeader;
