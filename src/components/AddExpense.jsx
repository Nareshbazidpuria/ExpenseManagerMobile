import {
  ActivityIndicator,
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
import { useEffect, useRef, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { addExpenseAPI, editExpenseAPI } from "../api/apis";
import { expenseTypes, primary } from "../utils/common";

const AddExpense = ({ visible, setVisible, setRefresh, edit, setEdit }) => {
  const to = visible;
  const other = useRef();
  const defaultPayload = { amount: 0, purpose: "", additional: "" };
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const [keyB, setKeyB] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(defaultPayload);
  const [error, setError] = useState({
    amount: "",
    purpose: "",
    additional: "",
  });
  const addOptions = [
    "Write your own ...",
    "Grocery",
    "Onion 🧅",
    "Tomato 🍅",
    "Vegitables",
    "Milk 🥛",
  ];

  const valid = (payload) => {
    const err = {};
    if (!payload.amount) err.amount = "Please enter amount";
    if (!payload.purpose) err.purpose = "Please enter purpose";
    if (payload.purpose === "Write your own ..." && !payload.additional)
      err.additional = "Please enter other purpose";
    setError(err);
    return !Object.values(err).some((e) => e);
  };

  const addExpense = async () => {
    try {
      setLoading(true);
      if (!valid(payload)) return;
      const res = edit
        ? await editExpenseAPI(edit?._id, { ...payload, to })
        : await addExpenseAPI({ ...payload, to });
      if (res?.status === 201) {
        message(res?.data?.message);
        setVisible(false);
        setPayload(defaultPayload);
        if (setEdit) setEdit();
        if (setRefresh) setRefresh(new Date());
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message);
      else console.log(error);
    } finally {
      setLoading(false);
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
    if (payload.purpose === "Write your own ...") other?.current?.focus();
  }, [payload.purpose]);

  useEffect(() => {
    if (edit) {
      setVisible(edit?.to);
      setPayload({
        amount: edit?.amount,
        purpose: addOptions?.includes(edit?.purpose)
          ? edit?.purpose
          : addOptions[0],
        additional: edit?.purpose,
      });
    }
  }, [edit]);

  return (
    <Modal animationType="slide" transparent={true} visible={!!visible}>
      <View
        style={tw`bg-[#00000055] flex items-center pt-[${
          keyB ? 100 : 200
        }] h-[${Dimensions.get("screen").height / 4}]`}
      >
        <View style={tw`bg-white w-80 py-4 rounded shadow`}>
          {loading ? (
            <View style={tw`flex h-56 justify-center`}>
              <ActivityIndicator color={primary} size={50} />
            </View>
          ) : (
            <>
              <Text style={tw`text-center mb-5 text-xl font-semibold`}>
                {edit ? "Edit" : "Add"} Expenses (
                {{ [expenseTypes.own]: "Own", [expenseTypes.team]: "Team" }[
                  to
                ] || to}
                )
              </Text>
              <View style={tw``}>
                <View style={tw`p-4`}>
                  <Text>Amount</Text>
                  <TextInput
                    style={tw`border-b border-gray-400 `}
                    keyboardType="numeric"
                    value={payload.amount?.toString()}
                    onChangeText={(amount) =>
                      setPayload({ ...payload, amount: parseInt(amount || 0) })
                    }
                  />
                  <Text style={tw` text-xs text-red-400`}>{error.amount}</Text>
                  <Text>Purpose</Text>
                  <SelectDropdown
                    data={addOptions}
                    onSelect={(purpose) => setPayload({ ...payload, purpose })}
                    buttonStyle={tw`w-full bg-white border-b p-0 border-gray-400 text-sm `}
                    rowStyle={tw`p-0`}
                    rowTextStyle={tw`text-sm m-0 text-left pl-2`}
                    buttonTextStyle={tw`text-sm m-0 text-left`}
                    defaultValue={payload?.purpose}
                  />
                  <Text style={tw` text-xs text-red-400`}>{error.purpose}</Text>
                  {payload.purpose === "Write your own ..." && (
                    <>
                      <Text>Other</Text>
                      <TextInput
                        ref={other}
                        style={tw`border-b border-gray-400 `}
                        value={edit?.purpose || payload.additional}
                        defaultValue={edit?.purpose || payload.additional}
                        onChangeText={(additional) =>
                          setPayload({ ...payload, additional })
                        }
                      />
                      <Text style={tw` text-xs text-red-400`}>
                        {error.additional}
                      </Text>
                    </>
                  )}
                </View>
              </View>
              <View style={tw`flex flex-row justify-around`}>
                <Bicon
                  title="Cancel"
                  cls="w-2/5"
                  bg="#ffffff"
                  onPress={() => {
                    setVisible(false);
                    setPayload(defaultPayload);
                    setError({});
                    if (setEdit) setEdit();
                  }}
                />
                <Bicon title="Save" cls="w-2/5" onPress={addExpense} />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AddExpense;
