import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  // Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
// import SelectDropdown from 'react-native-select-dropdown';
import { addExpenseAPI, editExpenseAPI } from '../api/apis';
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

const AddExpenseScreen = (
  {
    // visible,
    // setVisible,
    // setRefresh,
    // edit,
    // setEdit,
  },
) => {
  const route = useRoute();
  const data = route?.params?.data || {};
  const type = data.type || 'group';
  const //  to = typeof visible === 'object' ? visible?._id : visible,
    other = useRef(null),
    dropdownRef = useRef(null),
    isFocused = useIsFocused(),
    defaultPayload = { amount: 0, purpose: '', additional: '', image: [] },
    message = (msg: string) => ToastAndroid.show(msg, ToastAndroid.LONG),
    [keyB, setKeyB] = useState(false),
    [loading, setLoading] = useState(false),
    [payload, setPayload] = useState(defaultPayload),
    [content, setContent] = useState(),
    // [me, setMe] = useState({}),
    [error, setError] = useState({ amount: '', purpose: '', additional: '' }),
    [addOptions, setAddOptions] = useState(['Write your own ...']),
    [additional, setAdditional] = useState<string>(''),
    { authUser } = useSelector(state => state);

  // const valid = payload => {
  //   const err = {};
  //   if (!payload.amount) err.amount = 'Please enter amount';
  //   if (!payload.purpose) err.purpose = 'Please enter purpose';
  //   if (payload.purpose === 'Write your own ...' && !payload.additional)
  //     err.additional = 'Please enter other purpose';
  //   setError(err);
  //   return !Object.values(err).some(e => e);
  // };

  // const addExpense = async () => {
  //   try {
  //     setLoading(true);
  //     if (!valid(payload)) return;
  //     const res = edit
  //       ? await editExpenseAPI(edit?._id, { ...payload, to })
  //       : await addExpenseAPI({ ...payload, to });
  //     if (res?.status === 201) {
  //       message(res?.data?.message);
  //       setVisible(false);
  //       setPayload(defaultPayload);
  //       if (setEdit) setEdit();
  //       if (setRefresh) setRefresh(new Date());
  //       if (res.data?.data?.message)
  //         setContent(
  //           <LimitCrossed
  //             message={res.data.data.message}
  //             setContent={setContent}
  //           />,
  //         );
  //     }
  //   } catch (error) {
  //     if (error?.data?.message) message(error.data.message);
  //     else console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  console.log(data);

  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  const pickImage = async () => {
    const result = await launchImageLibrary(options);
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
    } else {
      const asset = result.assets?.[0];
      console.log('Image URI:', asset?.uri);
      setPayload({
        ...payload,
        images: [...(payload.images || []), asset?.uri || ''].filter(Boolean),
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
  //     setVisible(edit?.to);
  //     setPayload({
  //       amount: edit?.amount,
  //       purpose: addOptions?.includes(edit?.purpose)
  //         ? edit?.purpose
  //         : addOptions[0],
  //       additional: edit?.purpose,
  //     });
  //   }
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

  console.log(authUser);

  return (
    <>
      <TopBar name="Add Expense" />
      <ScrollView className="flex-1 bg-white p-4">
        <Text className="text-center text-lg font-semibold mb-4">
          {data.name}
          <Text className="text-gray-500">
            {type === expenseTypes.group &&
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
            setAdditional('');
            setPayload({ ...payload, purpose: option.value });
          }}
        />
        <Text className="mt-2">
          Amount<Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          value={payload.amount?.toString()}
          onChangeText={amount => {
            setPayload({
              ...payload,
              amount: isNaN(parseInt(amount || 0)) ? 0 : parseInt(amount || 0),
            });
          }}
          inputMode="numeric"
          keyboardType="numeric"
          placeholder="Enter amount"
          className="border-b border-gray-300 p-2 mb-4 text-black"
        />
        {/* Selected Images  */}
        {payload.images?.length && (
          <View className="flex flex-row flex-wrap gap-2 mb-4">
            {payload.images.map((image, index) => (
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
                  source={{ uri: image }}
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
          <View className="flex flex-row items-center gap-2 justify-end">
            <IonIcon
              name="camera"
              size={24}
              color={primary}
              onPress={() =>
                launchCamera(options, res => {
                  if (res.didCancel) {
                    console.log('User cancelled camera');
                  } else if (res.errorCode) {
                    console.log('Camera Error: ', res.errorMessage);
                  } else {
                    const asset = res.assets?.[0];
                    console.log('Camera URI:', asset?.uri);
                    setPayload({
                      ...payload,
                      images: [
                        ...(payload.images || []),
                        asset?.uri || '',
                      ].filter(Boolean),
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

        {type === expenseTypes.group && (
          <View className="flex flex-row items-center gap-2 mt-2">
            <Text>
              Expense will be divided among {data?.members?.length} members
            </Text>
            {/* <IonIcon name="pencil" size={16} color={primary} /> */}
          </View>
        )}
        {/* <Text className="mt-2">Split Expense</Text> */}

        <Bicon
          title="Add Expense"
          cls="w-full mt-5"
          txtCls="font-bold text-base"
          onPress={() => {
            if (!payload.amount || !payload.purpose) {
              setError({
                amount: !payload.amount ? 'Please enter amount' : '',
                purpose: !payload.purpose ? 'Please enter purpose' : '',
                additional: '',
              });
              return;
            }
            // addExpense();
            console.log('Expense added:', payload);
          }}
        />
      </ScrollView>
    </>
  );
};

export default AddExpenseScreen;
