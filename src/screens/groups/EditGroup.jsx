import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Modal,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import tw from "twrnc";
import { useEffect, useState } from "react";
import Bicon from "../../components/Bicon";
import { primary } from "../../utils/common";
import { editGroupAPI } from "../../api/group";

const EditGroup = ({ group, cancel }) => {
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const [keyB, setKeyB] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({ name: group?.name });
  const [error, setError] = useState({});

  const valid = (name) => {
    const err = {};
    if (!name) err.name = "Plaese enter name";
    else if (name.length < 3 || name.length > 20)
      err.name = "Name should be between 3 to 20 characters";
    setError(err);
    return !Object.values(err).some((e) => e);
  };

  const update = async () => {
    try {
      setLoading(true);
      if (!valid(payload?.name)) return;
      const res = await editGroupAPI(group?._id, payload);
      if (res?.status === 200) {
        message(res?.data?.message);
        cancel?.();
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

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
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
                Edit Group Name
              </Text>
              <View style={tw``}>
                <View style={tw`p-4`}>
                  <Text>Name</Text>
                  <TextInput
                    style={tw`border-b border-gray-400 `}
                    value={payload.name}
                    onChangeText={(name) => setPayload({ name })}
                  />
                  <Text style={tw`text-xs text-red-400`}>{error.name}</Text>
                </View>
              </View>
              <View style={tw`flex flex-row justify-around`}>
                <Bicon
                  title="Cancel"
                  cls="w-2/5"
                  bg="#ffffff"
                  onPress={cancel}
                />
                <Bicon title="Save" cls="w-2/5" onPress={update} />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default EditGroup;
