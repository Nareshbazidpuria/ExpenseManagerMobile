import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Modal,
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
  console.log('params', route.params);
  const //  to = typeof visible === 'object' ? visible?._id : visible,
    other = useRef(null),
    dropdownRef = useRef(null),
    isFocused = useIsFocused(),
    defaultPayload = { amount: 0, purpose: '', additional: '' },
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
      <View className="flex-1 bg-white p-4">
        <Text className="text-center text-lg font-semibold mb-4">
          {route?.params?.data?.name || route?.params?.to}
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
            payload.additional && {
              label: payload.additional,
              value: payload.additional,
            },
            ...authUser?.options?.map(option => ({
              label: option,
              value: option,
            })),
            { label: 'Write your own ...', value: 'custom_em_82684' },
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
            borderRadius: 10,
            overflow: 'hidden',
          }}
          iconColor="white"
          labelField="label"
          valueField="value"
          value={payload.additional || payload.purpose}
          renderItem={item => {
            if (item.value === 'custom_em_82684') {
              return (
                <View className="flex flex-row justify-between items-center px-2">
                  <TextInput
                    value={additional}
                    onChangeText={setAdditional}
                    placeholder="Write your own description here"
                    className={`border-b border-gray-300 p-2 mb-4 ${
                      additional ? 'w-4/5' : 'w-full'
                    }`}
                  />
                  {additional && (
                    <Bicon
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
            return <Text className="p-3">{item.label}</Text>;
          }}
          onChange={() => {}}
        />
        <Text className="mt-2">
          Amount<Text className="text-red-600">*</Text>
        </Text>
        <TextInput
          value={payload.amount?.toString()}
          onChangeText={amount => {
            const digitsOnly = amount.replace(/[^0-9]/g, '');
            setPayload({ ...payload, amount: +digitsOnly || 0 });
          }}
          inputMode="numeric"
          keyboardType="numeric"
          placeholder="Enter amount"
          className="border-b border-gray-300 p-2 mb-4"
        />
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
      </View>
    </>
  );
};

export default AddExpenseScreen;
