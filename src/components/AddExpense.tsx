// import {
//   ActivityIndicator,
//   Dimensions,
//   Keyboard,
//   Modal,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';
// import Bicon from './Bicon';
// import { useEffect, useRef, useState } from 'react';
// // import SelectDropdown from 'react-native-select-dropdown';
// import { addExpenseAPI, editExpenseAPI } from '../api/apis';
// import { expenseTypes, primary } from '../utils/global';
// import Popup from './Popup';
// import LimitCrossed from './LimitCrossed';
// import { useIsFocused } from '@react-navigation/native';
// import { message } from '../utils/common';
// // import { AsyncStorage } from 'react-native';

// const AddExpense = ({ visible, setVisible, setRefresh, edit, setEdit }) => {
//   const to = typeof visible === 'object' ? visible?._id : visible,
//     other = useRef(),
//     isFocused = useIsFocused(),
//     defaultPayload = { amount: 0, purpose: '', additional: '' },
//     [keyB, setKeyB] = useState(false),
//     [loading, setLoading] = useState(false),
//     [payload, setPayload] = useState(defaultPayload),
//     [content, setContent] = useState(),
//     // [me, setMe] = useState({}),
//     [error, setError] = useState({ amount: '', purpose: '', additional: '' }),
//     [addOptions, setAddOptions] = useState(['Write your own ...']);

//   const valid = payload => {
//     const err = {};
//     if (!payload.amount) err.amount = 'Please enter amount';
//     if (!payload.purpose) err.purpose = 'Please enter purpose';
//     if (payload.purpose === 'Write your own ...' && !payload.additional)
//       err.additional = 'Please enter other purpose';
//     setError(err);
//     return !Object.values(err).some(e => e);
//   };

//   const addExpense = async () => {
//     try {
//       setLoading(true);
//       if (!valid(payload)) return;
//       const res = edit
//         ? await editExpenseAPI(edit?._id, { ...payload, to })
//         : await addExpenseAPI({ ...payload, to });
//       if (res?.status === 201) {
//         message(res?.data?.message);
//         setVisible(false);
//         setPayload(defaultPayload);
//         if (setEdit) setEdit();
//         if (setRefresh) setRefresh(new Date());
//         if (res.data?.data?.message)
//           setContent(
//             <LimitCrossed
//               message={res.data.data.message}
//               setContent={setContent}
//             />,
//           );
//       }
//     } catch (error) {
//       if (error?.data?.message) message(error.data.message, 'error');
//       else console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const show = Keyboard.addListener('keyboardDidShow', () => setKeyB(true));
//     const hide = Keyboard.addListener('keyboardDidHide', () => setKeyB(false));
//     return () => {
//       show.remove();
//       hide.remove();
//     };
//   }, []);

//   useEffect(() => {
//     if (payload.purpose === 'Write your own ...') other?.current?.focus();
//     else setPayload({ ...payload, additional: '' });
//   }, [payload.purpose]);

//   useEffect(() => {
//     if (edit) {
//       setVisible(edit?.to);
//       setPayload({
//         amount: edit?.amount,
//         purpose: addOptions?.includes(edit?.purpose)
//           ? edit?.purpose
//           : addOptions[0],
//         additional: edit?.purpose,
//       });
//     }
//   }, [edit]);

//   // useEffect(() => {
//   //   AsyncStorage.getItem('user')
//   //     .then(data => {
//   //       // setMe(JSON.parse(data || "{}"));
//   //       setAddOptions([
//   //         ...(addOptions || []),
//   //         ...(JSON.parse(data || '{}')?.options || []),
//   //       ]);
//   //     })
//   //     .catch(e => console.log(e));
//   // }, [isFocused]);

//   return (
//     <>
//       <Modal animationType="slide" transparent={true} visible={!!visible}>
//         <View
//           className={`bg-[#00000055] flex items-center pt-[${
//             keyB ? 100 : 200
//           }]`}
//           style={{ height: Dimensions.get('screen').height }}
//         >
//           <View className={`bg-white w-80 py-4 rounded shadow`}>
//             {loading ? (
//               <View className={`flex h-56 justify-center`}>
//                 <ActivityIndicator color={primary} size={50} />
//               </View>
//             ) : (
//               <>
//                 <Text className={`text-center mb-5 text-xl font-semibold`}>
//                   {edit ? 'Edit' : 'Add'} Expenses
//                   {to === expenseTypes.own
//                     ? ' (Own)'
//                     : typeof visible === 'object' &&
//                       ` (${visible?.memberss?.[0]?.name || visible.name})`}
//                 </Text>
//                 <View className={``}>
//                   <View className={`p-4`}>
//                     <Text>Amount</Text>
//                     <TextInput
//                       className={`border-b border-gray-400 `}
//                       keyboardType="numeric"
//                       inputMode="numeric"
//                       value={payload.amount?.toString()}
//                       onChangeText={amount =>
//                         setPayload({
//                           ...payload,
//                           amount: isNaN(parseInt(amount || 0))
//                             ? 0
//                             : parseInt(amount || 0),
//                         })
//                       }
//                     />
//                     <Text className={`text-xs text-red-400`}>
//                       {error.amount}
//                     </Text>
//                     <Text>Purpose</Text>
//                     {/* {payload.purpose === "Write your own ..." ? (
//                       <>
//                         <TextInput
//                           ref={other}
//                           className={`border-b border-gray-400 `}
//                           value={payload.additional}
//                           defaultValue={payload.additional}
//                           onChangeText={(additional) =>
//                             setPayload({ ...payload, additional })
//                           }
//                         />
//                         <Text className={` text-xs text-red-400`}>
//                           {error.additional}
//                         </Text>
//                       </>
//                     ) : (
//                       <>
//                         <SelectDropdown
//                           data={[...new Set(addOptions)]}
//                           onSelect={(purpose) =>
//                             setPayload({ ...payload, purpose })
//                           }
//                           buttonStyle={tw`w-full bg-white border-b p-0 border-gray-400 text-sm`}
//                           rowStyle={tw`p-0 h-8`}
//                           rowTextStyle={tw`text-sm m-0 text-left pl-2`}
//                           buttonTextStyle={tw`text-sm m-0 text-left`}
//                           defaultValue={payload?.purpose}
//                         />
//                         <Text className={` text-xs text-red-400`}>
//                           {error.purpose}
//                         </Text>
//                       </>
//                     )} */}
//                   </View>
//                 </View>
//                 <View className={`flex flex-row justify-around`}>
//                   <Bicon
//                     title="Cancel"
//                     cls="w-2/5"
//                     bg="#ffffff"
//                     onPress={() => {
//                       setVisible(false);
//                       setPayload(defaultPayload);
//                       setError({});
//                       if (setEdit) setEdit();
//                     }}
//                   />
//                   <Bicon title="Save" cls="w-2/5" onPress={addExpense} />
//                 </View>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
//       {content && <Popup content={content} />}
//     </>
//   );
// };

// export default AddExpense;
