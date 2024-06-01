import {
  ActivityIndicator,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/common";
import Bicon from "../../components/Bicon";
import { useState } from "react";
import { changePwdAPI } from "../../api/auth";
import CheckBox from "react-native-check-box";

const ChangePwd = ({ cancel }) => {
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const [loading, setLoading] = useState();
  const [error, setError] = useState({});
  const [payload, setPayload] = useState({});
  const [showPassword, setShowPassword] = useState();

  const valid = () => {
    const err = {};
    if (!payload.password) err.password = "Plaese enter password";
    if (!payload.newPassword) err.newPassword = "Plaese enter password";
    else if (payload.newPassword.length < 8)
      err.newPassword = "Password should be atleast 8 characters long";
    else if (payload.newPassword.length > 30)
      err.newPassword = "Password allows maximum 30 characters";
    setError(err);
    return !Object.values(err).some((e) => e);
  };

  const update = async () => {
    try {
      setLoading(true);
      if (!valid()) return;
      const res = await changePwdAPI(payload);
      if (res?.status === 200) {
        message(res?.data?.message);
        cancel?.();
      }
    } catch (error) {
      if (error?.data?.message) setError({ password: error.data.message });
      else console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={tw`text-center font-bold text-lg`}>Change Password</Text>
      <View style={tw`p-4`}>
        {loading ? (
          <ActivityIndicator color={primary} size={50} />
        ) : (
          <>
            <View style={tw`p-2`}>
              <Text>Current Password</Text>
              <TextInput
                secureTextEntry={!showPassword}
                style={tw`border-b border-gray-400 `}
                value={payload.password}
                onChangeText={(password) =>
                  setPayload({ ...payload, password })
                }
              />
              <Text style={tw`text-xs text-red-400`}>{error.password}</Text>
              <Text>New Password</Text>
              <TextInput
                secureTextEntry={!showPassword}
                style={tw`border-b border-gray-400 `}
                value={payload.newPassword}
                onChangeText={(newPassword) =>
                  setPayload({ ...payload, newPassword })
                }
              />
              <Text style={tw`text-xs text-red-400`}>{error.newPassword}</Text>
              <CheckBox
                onClick={() => setShowPassword(!showPassword)}
                isChecked={showPassword}
                checkedCheckBoxColor={primary}
                checkBoxColor={primary}
                rightText="Show Password"
              />
              <View style={tw`flex flex-row justify-between mt-2`}>
                <Bicon
                  title="Cancel"
                  cls="w-[48%]"
                  bg="#ffffff"
                  txtCls="font-bold text-base"
                  onPress={cancel}
                />
                <Bicon
                  title="Change"
                  cls="w-[48%]"
                  txtCls="font-bold text-base"
                  onPress={update}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ChangePwd;
