import {
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import tw from "twrnc";
import Bicon from "./Bicon";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { addExpenseAPI } from "../api/apis";
import { expenseTypes } from "../utils/common";

const AddExpense = ({ visible, setVisible }) => {
  const to = visible;
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const [keyB, setKeyB] = useState(false);
  const [payload, setPayload] = useState({
    amount: 0,
    purpose: "",
    additional: "",
  });

  const addExpense = async () => {
    try {
      const res = await addExpenseAPI({ ...payload, to });
      if (res?.status === 201) message(res?.data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setVisible(false);
      setPayload({});
    }
  };

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyB(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyB(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    setPayload({ ...payload, additional: "" });
  }, [payload.purpose]);

  return (
    <Modal animationType="slide" transparent={true} visible={!!visible}>
      <View
        style={tw`bg-[#00000055] flex items-center pt-[${
          keyB ? 100 : 200
        }] h-[${Dimensions.get("screen").height / 4}]`}
      >
        <View style={tw`bg-white w-72 py-4 rounded shadow`}>
          <Text style={tw`text-center mb-5 text-xl font-semibold`}>
            Add Expenses ({to === expenseTypes.own ? "Own" : "Team"})
          </Text>
          <View style={tw``}>
            <View style={tw`p-4`}>
              <Text>Amount</Text>
              <TextInput
                style={tw`border-b border-gray-400 mb-4`}
                keyboardType="number-pad"
                value={payload.amount}
                onChangeText={(amount) =>
                  setPayload({ ...payload, amount: parseInt(amount || 0) })
                }
              />
              <Text>Purpose</Text>
              <SelectDropdown
                data={[
                  "Write your own ...",
                  "Grocery",
                  "Onion 🧅",
                  "Tomato 🍅",
                  "Vegitables 🥔",
                  "Milk 🥛",
                ]}
                onSelect={(purpose, index) =>
                  setPayload({ ...payload, purpose })
                }
                buttonStyle={tw`w-full bg-white border-b p-0 border-gray-400 text-sm mb-4`}
                rowStyle={tw`p-0`}
                rowTextStyle={tw`text-sm m-0 text-left pl-2`}
                buttonTextStyle={tw`text-sm m-0 text-left`}
              />
              {payload.purpose === "Write your own ..." && (
                <>
                  <Text>Other</Text>
                  <TextInput
                    style={tw`border-b border-gray-400 mb-4`}
                    value={payload.additional}
                    onChangeText={(additional) =>
                      setPayload({ ...payload, additional })
                    }
                  />
                </>
              )}
            </View>
          </View>
          <View style={tw`flex flex-row justify-around`}>
            <Bicon
              title="Cancel"
              cls="w-2/5"
              bg="#ffffff"
              onPress={() => setVisible(false)}
            />
            <Bicon title="Save" cls="w-2/5" onPress={addExpense} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddExpense;
