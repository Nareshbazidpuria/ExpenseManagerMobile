import moment from 'moment';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import Avatar from './Avatar';
import IonIcon from 'react-native-vector-icons/Ionicons';
import verified from '../assets/verified.png';
import pending from '../assets/pending.png';
import { primary } from '../utils/global';
import { useState } from 'react';
// import Comments from './Comments';

// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from 'react-native-reanimated';

const PurchageItem = ({ data, me, loading, verifyExpense }) => {
  // const [commentsVisible, setCommentsVisible] = useState(false);
  const [details, setDetails] = useState(false);

  // const opacity = useSharedValue(0);
  // const translateY = useSharedValue(-10);

  // const toggleComments = () => {
  //   const toVisible = !commentsVisible;
  //   setCommentsVisible(toVisible);
  //   opacity.value = withTiming(toVisible ? 1 : 0, { duration: 200 });
  //   translateY.value = withTiming(toVisible ? 0 : -10, { duration: 200 });
  // };

  // const animatedStyle = useAnimatedStyle(() => ({
  //   opacity: opacity.value,
  //   transform: [{ translateY: translateY.value }],
  // }));

  return (
    <Pressable
      className="py-3 px-2 shadow bg-white m-1 mb-0 rounded overflow-hidden"
      // onPress={toggleComments}
    >
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <Avatar value={data?.user?.name} w={40} />
          <View>
            <View
              className="flex flex-row items-center gap-1"
              style={{
                width: Dimensions.get('window').width * 0.55,
              }}
            >
              {data?.edited && <IonIcon color="gray" name="pencil" />}
              <Text className="font-semibold">{data?.purpose}</Text>
            </View>
            <Text className="text-xs">
              {moment(data?.createdAt)?.format('hh:mm A DD/MM/YY')}
            </Text>
          </View>
        </View>
        <View className="flex flex-row gap-2 items-center">
          <Text className="text-xl font-semibold">₹{data?.amount}</Text>
          {loading ? (
            <ActivityIndicator size={20} color={primary} />
          ) : data.verified ? (
            <Image source={verified} className="h-5 w-5" />
          ) : me?._id === data.user._id ||
            data.verifiedBy?.includes?.(me?._id) ? (
            <Pressable
              onPressIn={() => setDetails(true)}
              onPressOut={() => setDetails(false)}
            >
              <Image source={pending} className="h-5 w-5" />
            </Pressable>
          ) : (
            <Text
              className="font-bold"
              style={{ color: primary }}
              onPress={verifyExpense}
            >
              Verify
            </Text>
          )}
        </View>
      </View>

      {details && (
        <View className="py-3 pb-0">
          <View className="flex flex-row gap-1">
            <Image source={verified} className="h-4 w-4" />
            <Text className="font-bold">Verified By:</Text>
          </View>
          <View className="py-1 px-5">
            {data?.members?.map?.(
              member =>
                data?.verifiedBy?.includes(member?._id) && (
                  <Text key={'v-' + member?._id}>{member?.name}</Text>
                ),
            )}
          </View>
          <View className="flex flex-row gap-1">
            <Image source={pending} className="h-4 w-4" />
            <Text className="font-bold">Pending from:</Text>
          </View>
          <View className="pt-1 px-5">
            {data?.members?.map?.(
              member =>
                !data?.verifiedBy?.includes(member?._id) && (
                  <Text key={'p-' + member?._id}>{member?.name}</Text>
                ),
            )}
          </View>
        </View>
      )}

      {/* {commentsVisible && (
        <Animated.View style={[animatedStyle]}>
          <Comments data={data} />
        </Animated.View>
      )} */}
    </Pressable>
  );
};

export default PurchageItem;
