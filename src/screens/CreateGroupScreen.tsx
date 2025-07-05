import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { primary, screens } from '../utils/global';
import Bicon from '../components/Bicon';
import Member from '../components/Member';
import { createGroupAPI, getMemberAPI } from '../api/group';
import Avatar from '../components/Avatar';
// import Info from '../components/Info';
import TopBar from '../components/TopBar';

const CreateGroupScreen = ({ navigation, route }) => {
  const message = msg => ToastAndroid.show(msg, ToastAndroid.LONG);

  const [loading, setLoading] = useState();
  const [error, setError] = useState({});
  const [payload, setPayload] = useState({});

  const validatePayload = () => {
    const errors = {},
      { name, members } = payload;
    if (!name) errors.name = 'Plaese enter name';
    else if (name.length < 3 || name.length > 20)
      errors.name = 'Name should be between 3 to 20 characters';
    else if (!members?.length)
      errors.secretCode = 'Please add atleast 1 member to create group';

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
        navigation.navigate(screens.Tabs);
        message(res.data?.message);
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message);
      else console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSecretCode = async secretCode => {
    try {
      if (secretCode?.length === 11) {
        const res = await getMemberAPI({ secretCode });
        if (res?.status === 200) {
          const member = res.data.data;
          if (payload.members?.find(({ _id }) => _id === member._id)) {
            setError({ secretCode: 'Member already selected' });
            return;
          }
          setPayload({
            ...payload,
            secretCode: '',
            members: [
              ...(payload.members || []),
              { name: member.name, _id: member._id },
            ],
          });
          return;
        }
      } else if (secretCode?.length > 11) {
        setError({ secretCode: 'Invalid secret code' });
        return;
      }
    } catch (err) {
      if (err?.data?.message) setError({ secretCode: err.data.message });
      else {
        console.log(err);
        setError({ secretCode: 'Invalid secret code' });
      }
    }
    setPayload({ ...payload, secretCode });
  };

  const remove = async _id => {
    setPayload({
      ...payload,
      members: [...(payload.members || [])].filter(
        member => _id !== member?._id,
      ),
    });
  };

  useEffect(() => {
    if (route?.params?.code) {
      onSecretCode(route.params.code);
    }
  }, [route?.params?.code]);

  return (
    <View>
      <TopBar name="Create a New Group" />
      <View className={`p-4`}>
        {loading ? (
          <ActivityIndicator color={primary} size={50} />
        ) : (
          <>
            <View className={`p-2`}>
              <View className={`mx-auto mb-5`}>
                <Avatar value={payload.name || 'New Group'} w={100} />
              </View>
              <Text>Name</Text>
              <TextInput
                className={`border-b border-gray-400 `}
                value={payload.name}
                autoCapitalize="words"
                onChangeText={name => setPayload({ ...payload, name })}
              />
              <Text className={`text-xs text-red-400`}>{error.name}</Text>
              <Text>Member's Secret Code</Text>
              <TextInput
                className={`border-b border-gray-400 `}
                value={payload.secretCode}
                onChangeText={onSecretCode}
                autoCapitalize="characters"
              />
              <Text className={`text-xs text-red-400`}>{error.secretCode}</Text>
              <Text>Members</Text>
              <ScrollView
                className={`border border-gray-400 min-h-12 mt-2 rounded-lg max-h-64`}
              >
                <Member key={'_id'} name={'You'} />
                {payload.members?.map(({ name, _id }) => (
                  <Member key={_id} name={name} close={() => remove(_id)} />
                ))}
              </ScrollView>
              <Bicon
                title="Create"
                cls="w-full mt-5"
                txtCls="font-bold text-base"
                onPress={create}
              />
            </View>
          </>
        )}
      </View>
      {/* <Info /> */}
    </View>
  );
};

export default CreateGroupScreen;
