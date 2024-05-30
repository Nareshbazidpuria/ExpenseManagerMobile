import {
  ActivityIndicator,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/common";
import { useState } from "react";
import Bicon from "../../components/Bicon";
import Member from "../../components/Member";
import { createGroupAPI, getMemberAPI } from "../../api/group";

const CreateGroup = ({ navigation }) => {
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);

  const [loading, setLoading] = useState();
  const [error, setError] = useState({});
  const [payload, setPayload] = useState({});

  const validatePayload = () => {
    const errors = {},
      { name, members } = payload;
    if (!name) errors.name = "Plaese enter name";
    else if (name.length < 3 || name.length > 20)
      errors.name = "Name should be between 3 to 20 characters";
    else if (!members?.length)
      errors.secretCode = "Please add atleast 1 member to create group";

    setError(errors);
    if (Object.values(errors).length) return 1;
  };

  const create = async () => {
    try {
      setLoading(true);
      if (validatePayload()) return;
      const { name, members } = payload;
      const res = await createGroupAPI({
        name,
        members: members?.map(({ _id }) => _id),
      });
      if ([200, 201].includes(res.status)) {
        setPayload({});
        navigation.navigate("Home");
        message(res.data?.message);
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message);
      else console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSecretCode = async (secretCode) => {
    try {
      if (secretCode?.length === 11) {
        const res = await getMemberAPI({ secretCode });
        if (res?.status === 200) {
          const member = res.data.data;
          if (payload.members?.find(({ _id }) => _id === member._id)) {
            setError({ secretCode: "Member already selected" });
            return;
          }
          setPayload({
            ...payload,
            secretCode: "",
            members: [
              ...(payload.members || []),
              { name: member.name, _id: member._id },
            ],
          });
          return;
        }
      } else if (secretCode?.length > 11) {
        setError({ secretCode: "Invalid secret code 1" });
        return;
      }
    } catch (error) {
      setError({ secretCode: "Invalid secret code 2" });
      if (error?.data?.message) message(error.data.message);
      else console.log(error);
    }
    setPayload({ ...payload, secretCode });
  };

  const remove = async (_id) => {
    setPayload({
      ...payload,
      members: [...(payload.members || [])].filter(
        (member) => _id !== member?._id
      ),
    });
  };

  return (
    <View>
      <View style={tw`p-4`}>
        {loading ? (
          <ActivityIndicator color={primary} size={50} />
        ) : (
          <>
            <View style={tw`p-4`}>
              <Text>Name</Text>
              <TextInput
                style={tw`border-b border-gray-400 `}
                value={payload.name}
                onChangeText={(name) => setPayload({ ...payload, name })}
              />
              <Text style={tw`text-xs text-red-400`}>{error.name}</Text>
              <Text>Secret Code</Text>
              <TextInput
                style={tw`border-b border-gray-400 `}
                value={payload.secretCode}
                onChangeText={onSecretCode}
              />
              <Text style={tw`text-xs text-red-400`}>{error.secretCode}</Text>
              <Text>Members</Text>
              <View style={tw`py-2`}>
                {payload.members?.map(({ name, _id }) => (
                  <Member key={_id} name={name} close={() => remove(_id)} />
                ))}
              </View>
            </View>
            <Bicon
              title="Create"
              cls="w-full"
              txtCls="font-bold text-base"
              onPress={create}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default CreateGroup;
