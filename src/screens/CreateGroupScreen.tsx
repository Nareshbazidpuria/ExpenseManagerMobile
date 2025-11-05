import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { primary, screens } from '../utils/global';
import Bicon from '../components/Bicon';
import Member from '../components/Member';
import { createGroupAPI, friendListAPI, getMemberAPI } from '../api/group';
import Avatar from '../components/Avatar';
// import Info from '../components/Info';
import TopBar from '../components/TopBar';
import IonIcon from 'react-native-vector-icons/Ionicons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { message } from '../utils/common';

const CreateGroupScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({});
  const [payload, setPayload] = useState({});
  const [freinds, setFreinds] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks

  const validatePayload = () => {
    const errors = {},
      { name, members } = payload;
    if (!name) errors.name = 'Plaese enter name';
    else if (name.length < 3 || name.length > 20)
      errors.name = 'Name should be between 3 to 20 characters';
    else if (!members?.length || members.length < 2)
      errors.secretCode = 'Please add atleast 3 members to create group';

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
      if (error?.data?.message) message(error.data.message, 'error');
      else console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const friendList = async (params = {}) => {
    let data = [];
    try {
      // setLoading(true);
      const res = await friendListAPI(params);
      if (res?.status === 200) data = res?.data?.data;
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
      setFreinds(data);
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

  useEffect(() => {
    friendList();
  }, []);

  return (
    <View className="flex-1">
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
              <Text>Members</Text>
              <ScrollView className={`min-h-12 mt-2 rounded-lg max-h-[320]`}>
                <View className="flex flex-row flex-wrap items-center gap-2">
                  <Member key={'_id'} name={'You'} />
                  {payload.members?.map(({ name, _id }) => (
                    <Member key={_id} name={name} close={() => remove(_id)} />
                  ))}
                  <Pressable
                    className="flex justify-center items-center gap-1"
                    style={{ width: Dimensions.get('screen').width / 4 - 16 }}
                    onPress={() => setVisible(true)}
                  >
                    <View
                      className="flex justify-center items-center h-12 w-12 rounded-full"
                      style={{ backgroundColor: primary }}
                    >
                      <IonIcon name="add" size={28} color="#ffffff" />
                    </View>
                    <Text>Add more</Text>
                  </Pressable>
                </View>
              </ScrollView>
              <Text className={`text-xs text-red-400`}>{error.secretCode}</Text>
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
      {visible && (
        <>
          <Pressable
            className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000] opacity-50"
            onPress={() => setVisible(false)}
          />
          <BottomSheet ref={bottomSheetRef}>
            <BottomSheetView className="py-2 px-5 max-h-[600]">
              <ScrollView className="max-h-[500]">
                {freinds?.map(({ name, _id }) => (
                  <Pressable
                    key={_id}
                    className={`p-2 flex flex-row items-center justify-between`}
                    onPress={() =>
                      setPayload(prev => ({
                        ...prev,
                        members: payload.members
                          ?.map(member => member._id)
                          .includes(_id)
                          ? [...(prev?.members || [])].filter(
                              member => member._id !== _id,
                            )
                          : [...(prev?.members || []), { name, _id }],
                      }))
                    }
                  >
                    <View className="flex flex-row items-center gap-3">
                      <Avatar value={name} />
                      <Text className="font-bold text-lg">{name}</Text>
                    </View>
                    {payload.members
                      ?.map(member => member._id)
                      .includes(_id) && (
                      <IonIcon
                        name="checkmark-circle"
                        size={28}
                        style={{ color: primary }}
                      />
                    )}
                  </Pressable>
                ))}
                {freinds?.length === 0 && (
                  <Text className="text-center my-10 text-gray-500">
                    No friends found. Add friends to create group.
                  </Text>
                )}
              </ScrollView>
              <Bicon
                title="Done"
                cls="my-10"
                txtCls="font-bold text-base"
                onPress={() => setVisible(false)}
              />
            </BottomSheetView>
          </BottomSheet>
        </>
      )}
    </View>
  );
};

export default CreateGroupScreen;
