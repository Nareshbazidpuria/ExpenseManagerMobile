import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  // Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
// import SelectDropdown from 'react-native-select-dropdown';
import { addExpenseAPI, editExpenseAPI, getExpenseAPI } from '../api/apis';
import { expenseTypes, primary } from '../utils/global';
import Popup from './Popup';
import LimitCrossed from './LimitCrossed';
import { useIsFocused, useRoute } from '@react-navigation/native';
import TopBar from '../components/TopBar';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import Bicon from '../components/Bicon';
// import { AsyncStorage } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Avatar from '../components/Avatar';
import SplitMember from '../components/SplitMember';
import { CheckBox } from 'rn-inkpad';
import SplitFriend from '../components/SplitFriend';
import Slider from '@react-native-community/slider';
import { showToast } from '../utils/Toast';
import { uploadImages } from '../utils/common';
import { baseURL } from '../api/axios';
import { RootState } from '../redux/store';

const AddExpenseScreen = ({
  navigation,
  // visible,
  // setVisible,
  // setRefresh,
  // edit,
  // setEdit,
}) => {
  const route = useRoute(),
    //  to = typeof visible === 'object' ? visible?._id : visible,
    id = route?.params?.id,
    other = useRef(null),
    dropdownRef = useRef(null),
    isFocused = useIsFocused(),
    defaultPayload = { amount: 0, purpose: '', additional: '', images: [] },
    message = (msg: string) => ToastAndroid.show(msg, ToastAndroid.LONG),
    [keyB, setKeyB] = useState(false),
    [data, setData] = useState(route?.params?.data || {}),
    [loading, setLoading] = useState(false),
    [payload, setPayload] = useState(defaultPayload),
    [content, setContent] = useState(),
    // [me, setMe] = useState({}),
    [error, setError] = useState({ amount: '', purpose: '' }),
    [addOptions, setAddOptions] = useState(['Write your own ...']),
    [additional, setAdditional] = useState<string>(''),
    [selected, setSelected] = useState<string[]>(
      data.type === expenseTypes.group
        ? data?.members?.map((i: string) => i)
        : data.type === expenseTypes.friend
        ? [data?._id]
        : [],
    ),
    [friendSplitValue, setFriendSplitValue] = useState<number>(100),
    authUser = useSelector((state: RootState) => state.authUser);

  const valid = payload => {
    const err = { amount: '', purpose: '' };
    if (!payload.amount) err.amount = 'Please enter amount';
    if (!payload.purpose) err.purpose = 'Please enter purpose';
    setError(err);
    return !Object.values(err).some(e => e);
  };

  const getExpense = async () => {
    try {
      setLoading(true); // todo: manage separate loading state
      const res = await getExpenseAPI(id);
      if (res?.status === 200) {
        // console.log(res?.data?.data);
        const apiPayload = res?.data?.data || {};
        if (apiPayload?.images?.length)
          apiPayload.images = apiPayload?.images?.map((i: string) => ({
            uri: `${baseURL}${i}`,
            edit: true,
          }));
        // setSelected(apiPayload?.members?.map((i: string) => i));
        if (apiPayload.splitedAmount)
          setFriendSplitValue(apiPayload.splitedAmount);
        if (apiPayload.splitedIn) setSelected(apiPayload.splitedIn);
        setPayload(apiPayload);
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      if (error?.data?.message) showToast('error', error.data.message);
      else console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async () => {
    try {
      //splitedIn
      setLoading(true);
      if (!valid(payload)) return;
      const apiPayload = {
        ...payload,
        to: data._id,
        expenseType: data.type,
        splitedIn: selected,
      };
      // todo manual split
      if (data.type === expenseTypes.friend)
        apiPayload.splitedAmount = friendSplitValue;
      if (payload.images.length) {
        const alreadyUploaded = payload.images.filter((i: any) => i?.edit),
          notUploaded = payload.images.filter((i: any) => !i?.edit);

        if (notUploaded.length) {
          const uploadRes = await uploadImages(notUploaded);
          if (uploadRes?.status === 200)
            apiPayload.images = [
              ...alreadyUploaded.map((i: any) => i.uri.replace(baseURL, '')),
              ...uploadRes?.data?.data,
            ];
          else
            return showToast(
              'error',
              uploadRes?.data?.message || 'Failed to upload images',
            );
        } else
          apiPayload.images = alreadyUploaded.map((i: any) =>
            i.uri.replace(baseURL, ''),
          );
      }
      // const res = edit
      //   ? await editExpenseAPI(edit?._id, payload )
      //   : await addExpenseAPI({ ...payload, to:data._id });
      const res = id
        ? await editExpenseAPI(id, apiPayload)
        : await addExpenseAPI(apiPayload);
      if ([201, 200].includes(res?.status)) {
        showToast(
          'success',
          res?.data?.message || 'Expense added successfully',
        );
        navigation.goBack();

        // if (setEdit) setEdit();
        // if (setRefresh) setRefresh(new Date());
        // if (res.data?.data?.message)
        //   setContent(
        //     <LimitCrossed
        //       message={res.data.data.message}
        //       setContent={setContent}
        //     />,
        //   );
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      if (error?.data?.message) showToast('error', error.data.message);
      else console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  const pickImage = async () => {
    const result = await launchImageLibrary(options);
    if (result.didCancel) {
    } else if (result.errorCode) {
    } else {
      const asset = result.assets?.[0];
      setPayload({
        ...payload,
        images: [...(payload.images || []), asset].filter(Boolean),
      });
    }
  };

  // useEffect(() => {
  //   const show = Keyboard.addListener('keyboardDidShow', () => setKeyB(true));
  //   const hide = Keyboard.addListener('keyboardDidHide', () => setKeyB(false));
  //   return () => {
  //     show.remove();
  //     hide.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (payload.purpose === 'Write your own ...') other?.current?.focus();
  //   else setPayload({ ...payload, additional: '' });
  // }, [payload.purpose]);

  // useEffect(() => {
  //   if (edit) {
  //     setPayload({
  //       amount: edit?.amount,
  //       purpose: edit?.purpose,
  //       additional: edit?.purpose || '',
  //       images: (edit?.images || []).map((i: string) => ({
  //         uri: baseURL + i,
  //         edit: true,
  //       })),
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [edit]);

  // useEffect(() => {
  //   AsyncStorage.getItem('user')
  //     .then(data => {
  //       // setMe(JSON.parse(data || "{}"));
  //       setAddOptions([
  //         ...(addOptions || []),
  //         ...(JSON.parse(data || '{}')?.options || []),
  //       ]);
  //     })
  //     .catch(e => console.log(e));
  // }, [isFocused]);

  useEffect(() => {
    if (selected.length !== 2) setFriendSplitValue(payload.amount || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected.length]);

  useEffect(() => {
    if (id) getExpense();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <TopBar name={id ? 'Edit Expense' : 'Add Expense'} />
      <ScrollView className="flex-1 bg-white p-4">
        <Text className="text-center text-lg font-semibold mb-4">
          {data.name}
          <Text className="text-gray-500">
            {data.type === expenseTypes.group &&
              ` (${data.members?.length} members)`}
          </Text>
        </Text>
        <Text>
          Description<Text className="text-red-600">*</Text>
        </Text>
        {/* <TextInput
          // ref={other}
          value={payload.purpose}
          onChangeText={text => setPayload({ ...payload, purpose: text })}
          placeholder="Write your description here"
          className="border-b border-gray-300 p-2 mb-4"
        /> */}
        <Dropdown
          ref={dropdownRef}
          data={[
            { label: 'Write your own ...', value: 'custom_em_82684' },
            payload.additional && {
              label: payload.additional,
              value: payload.additional,
            },
            ...authUser?.options?.map(option => ({
              label: option,
              value: option,
            })),
          ].filter(item => item.value)}
          maxHeight={600}
          // eslint-disable-next-line react-native/no-inline-styles
          placeholder="Select or write purpose ..."
          placeholderStyle={{ color: 'gray', fontSize: 14 }}
          selectedTextStyle={{ fontSize: 14 }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            // backgroundColor: primary,
            paddingHorizontal: 4,
            // borderRadius: 99,
            // marginHorizontal: 4,
            paddingVertical: 6,
            borderBottomWidth: 1,
            borderColor: 'lightgray',
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{
            // width: 130,
            paddingVertical: 4,
            borderRadius: 4,
            overflow: 'hidden',
          }}
          iconColor="white"
          labelField="label"
          valueField="value"
          value={payload.purpose}
          renderItem={item => {
            if (item.value === 'custom_em_82684') {
              return (
                <View className="flex flex-row justify-between items-center px-2">
                  <TextInput
                    value={additional}
                    onChangeText={setAdditional}
                    placeholder="Write your own description here"
                    placeholderTextColor={'gray'}
                    className={`border-b border-gray-300 p-1 ${
                      additional ? 'w-4/5' : 'w-full'
                    }`}
                  />
                  {additional && (
                    <Bicon
                      txtCls="text-xs"
                      title="Done"
                      onPress={() => {
                        setPayload({
                          ...payload,
                          purpose: additional,
                          additional: additional,
                        });
                        setAdditional('');
                        dropdownRef.current?.close?.();
                      }}
                    />
                  )}
                </View>
              );
            }
            return <Text className="px-3 py-1">{item.label}</Text>;
          }}
          onChange={option => {
            setError({ ...error, purpose: '' });
            setAdditional('');
            setPayload({ ...payload, purpose: option.value });
          }}
        />
        {error.purpose && (
          <Text className="text-red-600 text-xs">{error.purpose}</Text>
        )}
        <Text className="mt-2">
          Amount<Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          value={payload.amount?.toString()}
          onChangeText={text => {
            const amount = isNaN(parseInt(text || '0', 10))
              ? 0
              : parseInt(text || '0', 10);
            // const prevPercentage =
            //   (friendSplitValue * 100) / (payload.amount || 1);
            setPayload({ ...payload, amount });
            amount && setError({ ...error, amount: '' });
            // setFriendSplitValue(Math.floor((amount * prevPercentage) / 100));
            setFriendSplitValue(amount);
          }}
          inputMode="numeric"
          keyboardType="numeric"
          placeholder="Enter amount"
          className="border-b border-gray-300 p-2 text-black"
        />
        {error.amount && (
          <Text className="text-red-600 text-xs">{error.amount}</Text>
        )}
        {/* Selected Images  */}
        {!!payload.images?.length && (
          <View className="flex flex-row flex-wrap gap-2 my-4">
            {payload.images.map((image: any, index) => (
              <View
                key={index}
                className="border border-gray-300 rounded-lg overflow-hidden"
              >
                <IonIcon
                  name="close"
                  size={16}
                  color="gray"
                  onPress={() =>
                    setPayload({
                      ...payload,
                      images: [...(payload.images || [])].filter(
                        (_, i) => i !== index,
                      ),
                    })
                  }
                  className="absolute top-0 right-0 z-10 bg-white rounded-full p-1"
                />
                <Image
                  source={{ uri: image.uri }}
                  className="object-cover"
                  style={{
                    width: Dimensions.get('screen').width / 4 - 15,
                    height: Dimensions.get('screen').width / 4 - 15,
                  }}
                />
              </View>
            ))}
          </View>
        )}
        {(payload.images?.length || 0) < 4 && (
          <View className="flex flex-row items-center gap-2 justify-end mt-4">
            <IonIcon
              name="camera"
              size={24}
              color={primary}
              onPress={() =>
                launchCamera(options, res => {
                  if (res.didCancel) {
                  } else if (res.errorCode) {
                  } else {
                    const asset = res.assets?.[0];
                    setPayload({
                      ...payload,
                      images: [...(payload.images || []), asset].filter(
                        Boolean,
                      ),
                    });
                  }
                })
              }
            />
            <IonIcon
              name="image"
              size={24}
              color={primary}
              onPress={pickImage}
            />
          </View>
        )}

        {data.type === expenseTypes.group && (
          <View className="mt-2">
            <Text>
              Expense will be divided among {data?.members?.length} members
            </Text>
            <ScrollView className="p-2 border border-gray-400 mt-3 rounded-lg max-h-[300]">
              <SplitMember
                og={`${authUser.name?.trim().split(' ')[0]} (You)`}
                value={authUser.name}
                selected={selected}
                setSelected={setSelected}
                id={authUser._id}
                amount={payload.amount}
              />
              {data.memberss.map((member, index: number) => (
                <SplitMember
                  key={index}
                  value={member?.name}
                  selected={selected}
                  setSelected={setSelected}
                  id={member?._id}
                  amount={payload.amount}
                />
              ))}
            </ScrollView>
          </View>
        )}
        {data.type === expenseTypes.friend && (
          <View className="mt-2">
            <Text>Split Expense</Text>
            <View className="p-2 border border-gray-400 mt-3 rounded-lg">
              <SplitFriend
                og={`${authUser.name?.trim().split(' ')[0]} (You)`}
                value={authUser.name}
                selected={selected}
                setSelected={setSelected}
                id={authUser._id}
                amount={payload.amount}
                percentage={
                  100 - (friendSplitValue * 100) / (payload.amount || 1)
                }
              />
              <SplitFriend
                value={data.name}
                selected={selected}
                id={data._id}
                amount={payload.amount}
                percentage={(friendSplitValue * 100) / (payload.amount || 1)}
                msg="Cannot unselect friend"
              />
              {selected.length === 2 && (
                <Slider
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ width: '100%', height: 10, paddingVertical: 18 }}
                  minimumValue={0}
                  maximumValue={payload.amount || 0}
                  step={1}
                  value={friendSplitValue}
                  onValueChange={setFriendSplitValue}
                  minimumTrackTintColor={primary}
                  maximumTrackTintColor="#ccc"
                  thumbTintColor={primary}
                />
              )}
            </View>
          </View>
        )}
        <Bicon
          title={id ? 'Update' : 'Add Expense'}
          cls="w-full mt-5 mb-10"
          txtCls="font-bold text-base"
          onPress={addExpense}
        />
      </ScrollView>
    </>
  );
};

export default AddExpenseScreen;
