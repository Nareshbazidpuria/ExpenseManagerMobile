import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import Bicon from './Bicon';
import { useState } from 'react';
import { editProfileAPI } from '../api/auth';
import { primary } from '../utils/global';
import { message } from '../utils/common';

const EditProfile = ({ profile, cancel }) => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState({});
  const [payload, setPayload] = useState({
    name: profile.name,
    monthlyLimit: profile.monthlyLimit?.toString(),
  });

  const valid = name => {
    const err = {};
    if (!name) err.name = 'Plaese enter name';
    else if (name.length < 3 || name.length > 20)
      err.name = 'Name should be between 3 to 20 characters';
    setError(err);
    return !Object.values(err).some(e => e);
  };

  const update = async () => {
    try {
      setLoading(true);
      if (!valid(payload?.name)) return;
      const res = await editProfileAPI(payload);
      if (res?.status === 200) {
        message(res?.data?.message);
        cancel?.();
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message, 'error');
      else console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text className={`text-center font-bold text-lg`}>Edit Profile</Text>
      <View className={`p-4`}>
        {loading ? (
          <ActivityIndicator color={primary} size={50} />
        ) : (
          <>
            <View className={`p-2`}>
              <Text>Name</Text>
              <TextInput
                className={`border-b border-gray-400 `}
                value={payload.name}
                autoCapitalize="words"
                onChangeText={name => setPayload({ ...payload, name })}
              />
              <Text className={`text-xs text-red-400`}>{error.name}</Text>
              <Text>Monthly Expense Limit</Text>
              <TextInput
                className={`border-b border-gray-400 `}
                value={payload.monthlyLimit}
                onChangeText={monthlyLimit =>
                  setPayload({ ...payload, monthlyLimit })
                }
              />
              <Text className={`text-xs text-red-400`}>
                {error.monthlyLimit}
              </Text>
              <View className={`flex flex-row justify-between`}>
                <Bicon
                  title="Cancel"
                  cls="w-[48%]"
                  bg="#ffffff"
                  txtCls="font-bold text-base"
                  onPress={cancel}
                />
                <Bicon
                  title="Update"
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

export default EditProfile;
