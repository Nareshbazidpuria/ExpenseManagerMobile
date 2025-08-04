import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { primary } from '../utils/global';
import { useEffect, useState } from 'react';
import Avatar from './Avatar';
import IonIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { baseURL } from '../api/axios';
import { useDispatch } from 'react-redux';
import { setStatusBarColor } from '../redux/common';

const Comments = ({ data }) => {
  const dispatch = useDispatch(),
    [comments, setComments] = useState([]),
    [payload, setPayload] = useState({ comment: '' }),
    [replying, setReplying] = useState(),
    [sliderImages, setSliderImages] = useState<string[]>([]),
    [initialScrollIndex, setInitialScrollIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(setStatusBarColor(sliderImages.length ? '#000000' : primary));
  }, [sliderImages.length]);

  return (
    <View className="my-2">
      <Text className="mb-1">
        <Text className="text-gray-500">
          Description
          {data?.edited && (
            <Text className="italic text-sm text-gray-500">&nbsp;Edited</Text>
          )}
          :
        </Text>
        <Text>&nbsp;{data?.purpose}</Text>
      </Text>
      <Text className="mb-1">
        <Text className="text-gray-500">Added on:&nbsp;</Text>
        <Text>{moment(data?.createdAt)?.format('hh:mm A DD/MM/YY')}</Text>
      </Text>
      {data?.images?.length && (
        <View className="flex flex-row items-center gap-2 mt-2">
          {data?.images?.map((image, index) => (
            // <Image
            //   key={index}
            //   source={{ uri: baseURL + image }}
            //   className="w-20 h-20"
            // />

            <Pressable
              onPress={() => {
                setInitialScrollIndex(index);
                setSliderImages(data?.images);
              }}
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden"
            >
              <Image
                source={{ uri: baseURL + image }}
                className="object-cover"
                style={{
                  width: Dimensions.get('screen').width / 4 - 13,
                  height: Dimensions.get('screen').width / 4 - 13,
                }}
              />
            </Pressable>
          ))}
        </View>
      )}
      {sliderImages?.length && (
        <Modal visible={!!sliderImages?.length} transparent={true}>
          <Pressable
            onPress={() => setSliderImages([])}
            className={`absolute z-10 flex items-center justify-center bg-white rounded-full ${
              Platform.OS === 'ios' ? 'top-20 right-4' : 'top-2 right-2'
            }`}
          >
            <IonIcon name="close" size={28} color="gray" />
          </Pressable>
          <FlatList
            data={sliderImages}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={initialScrollIndex}
            renderItem={image => (
              <View
                className="bg-black"
                style={{
                  width: Dimensions.get('screen').width,
                  height: Dimensions.get('screen').height,
                }}
              >
                <Image
                  source={{ uri: baseURL + image.item }}
                  className="w-full h-full"
                  style={{ objectFit: 'contain' }}
                />
              </View>
            )}
            snapToInterval={Dimensions.get('screen').width}
            decelerationRate="fast"
            getItemLayout={(_, index) => ({
              length: Dimensions.get('screen').width,
              offset: Dimensions.get('screen').width * index,
              index,
            })}
          />
        </Modal>
      )}
    </View>
  );
  // return (
  //   <View>
  //     <Text className={`my-2 font-semibold`}>Comments</Text>
  //     {comments?.length ? (
  //       <View className={`mb-1 max-w-full`}>
  //         {comments.map((comment, index) => (
  //           <View
  //             className={`mb-1 border-l pl-1`}
  //             style={{ borderColor: primary }}
  //           >
  //             <View className={`flex flex-row items-center gap-2 max-w-4/5`}>
  //               <Avatar value="Tanvi Negi" w={30} />
  //               <View>
  //                 <Text key={index} className={`text-xs`}>
  //                   {comment}
  //                 </Text>
  //                 <View className={`flex flex-row items-center gap-2`}>
  //                   <Pressable onPress={setReplying.bind('', comment)}>
  //                     <Text
  //                       className={`text-[10px]`}
  //                       style={{ color: primary }}
  //                     >
  //                       Reply
  //                     </Text>
  //                   </Pressable>
  //                 </View>
  //               </View>
  //             </View>
  //             {
  //               <View className={`my-1 ml-6`}>
  //                 <View
  //                   className={`flex flex-row items-center gap-2 max-w-4/5`}
  //                 >
  //                   <Avatar value="Naresh Bazidpuria" w={30} />
  //                   <View>
  //                     <Text key={index} className={`text-xs`}>
  //                       <Text
  //                         className={`font-bold text-xs`}
  //                         style={{ color: primary }}
  //                       >
  //                         @Tanvi Negi
  //                       </Text>
  //                       {comment}
  //                     </Text>
  //                     <View className={`flex flex-row items-center gap-2`}>
  //                       <Pressable onPress={setReplying.bind('', comment)}>
  //                         <Text
  //                           className={`text-[10px]]`}
  //                           style={{ color: primary }}
  //                         >
  //                           Reply
  //                         </Text>
  //                       </Pressable>
  //                     </View>
  //                   </View>
  //                 </View>
  //               </View>
  //             }
  //           </View>
  //         ))}
  //       </View>
  //     ) : (
  //       <Text className={`mb-2`}>No comments yet</Text>
  //     )}
  //     {/* {data.comments?.length ? <Text>dd</Text> : <Text>No comments yet</Text>} */}
  //     <View
  //       className={`${replying ? `border rounded` : ''}`}
  //       style={{ borderColor: primary }}
  //     >
  //       {replying && (
  //         <View
  //           className={`flex flex-row justify-between items-center bg-green-100 py-1 px-2 rounded border-l-2 m-0.5`}
  //           style={{ borderColor: primary }}
  //         >
  //           <View>
  //             <Text className={`font-bold text-[10px]`}>Tanvi Negi </Text>
  //             <Text className={`text-xs`}>{replying}</Text>
  //           </View>
  //           <IonIcon
  //             name="close"
  //             className={`text-base`}
  //             onPress={setReplying.bind('', false)}
  //           />
  //         </View>
  //       )}
  //       <View
  //         className={`flex flex-row justify-between items-center px-2 ${
  //           !replying ? `border rounded-full` : ''
  //         }`}
  //         style={{ borderColor: primary }}
  //       >
  //         <TextInput
  //           placeholder="Add a comment"
  //           className={`w-[90%] py-1`}
  //           value={payload.comment}
  //           onChangeText={comment => setPayload(prev => ({ ...prev, comment }))}
  //         />
  //         <IonIcon
  //           name="send"
  //           className={`text-lg p-1`}
  //           style={{ color: primary }}
  //           onPress={() => setComments([...comments, payload.comment])}
  //         />
  //       </View>
  //     </View>
  //   </View>
  // );
};

export default Comments;
