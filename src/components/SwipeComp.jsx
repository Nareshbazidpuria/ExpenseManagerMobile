import {
  ActivityIndicator,
  Easing,
  Pressable,
  ToastAndroid,
} from "react-native";
import tw from "twrnc";
import IonIcon from "@expo/vector-icons/Ionicons";
import Swipeable from "react-native-swipeable";
import { useEffect, useState } from "react";
import PurchageItem from "./PurchaseItem";
import { deleteExpenseAPI } from "../api/apis";

const SwipeComp = ({ data, swiped, setSwiped, me, setDeleted }) => {
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const [swipeable, setSwipeable] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteExpense = async () => {
    try {
      setLoading(true);
      const res = await deleteExpenseAPI({ _id: data?._id });
      if (res?.status === 200) {
        message(res?.data?.message);
        setDeleted(data?._id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      if (swipeable) swipeable.recenter();
    }
  };

  useEffect(() => {
    if (swipeable && swiped !== data?._id) swipeable.recenter();
  }, [swiped]);

  return JSON.parse(me || "{}")._id === data?.user?._id ? (
    <Swipeable
      onRef={(ref) => setSwipeable(ref)}
      onSwipeRelease={() => setSwiped(data?._id)}
      rightButtons={[
        <Pressable
          style={tw`bg-red-600 m-1 w-16 rounded-full h-16 flex items-center justify-center`}
          onPress={deleteExpense}
        >
          {loading ? (
            <ActivityIndicator size={25} color="white" />
          ) : (
            <IonIcon name="trash" color="white" size={25} />
          )}
        </Pressable>,
      ]}
      swipeReleaseAnimationConfig={{
        toValue: { x: 0, y: 0 },
        duration: 250,
        easing: Easing.elastic(0.5),
        useNativeDriver: true,
      }}
    >
      <PurchageItem data={data} />
    </Swipeable>
  ) : (
    <PurchageItem data={data} />
  );
};

export default SwipeComp;
