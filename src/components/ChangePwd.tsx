import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import Bicon from './Bicon';
import { useState } from 'react';
// import CheckBox from 'react-native-check-box';
import { changePwdAPI } from '../api/auth';
import { primary } from '../utils/global';
import { message } from '../utils/common';

const ChangePwd = ({ cancel }) => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState({});
  const [payload, setPayload] = useState({});
  const [showPassword, setShowPassword] = useState(); //todo checkbox

  const valid = () => {
    const err = {};
    if (!payload.password) err.password = 'Plaese enter password';
    if (!payload.newPassword) err.newPassword = 'Plaese enter password';
    else if (payload.newPassword.length < 8)
      err.newPassword = 'Password should be atleast 8 characters long';
    else if (payload.newPassword.length > 30)
      err.newPassword = 'Password allows maximum 30 characters';
    setError(err);
    return !Object.values(err).some(e => e);
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
    <View className="px-6 py-4">
      <Text className={`text-center font-bold text-lg`}>Change Password</Text>
      {loading ? (
        <ActivityIndicator color={primary} size={50} />
      ) : (
        <>
          <View className={`p-2`}>
            <Text>Current Password</Text>
            <TextInput
              secureTextEntry={!showPassword}
              className={`border-b border-gray-400 `}
              value={payload.password}
              onChangeText={password => setPayload({ ...payload, password })}
            />
            <Text className={`text-xs text-red-400`}>{error.password}</Text>
            <Text>New Password</Text>
            <TextInput
              secureTextEntry={!showPassword}
              className={`border-b border-gray-400 `}
              value={payload.newPassword}
              onChangeText={newPassword =>
                setPayload({ ...payload, newPassword })
              }
            />
            <Text className={`text-xs text-red-400`}>{error.newPassword}</Text>
            {/* <CheckBox
                onClick={() => setShowPassword(!showPassword)}
                isChecked={showPassword}
                checkedCheckBoxColor={primary}
                checkBoxColor={primary}
                rightText="Show Password"
              /> */}
            <View className={`flex flex-row justify-between mt-2`}>
              <Bicon
                title="Cancel"
                cls="w-[48%]"
                borderColor={primary}
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
  );
};

export default ChangePwd;
