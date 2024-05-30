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

const SwipeComp = ({ data, swiped, setSwiped, me, setDeleted, setEdit }) => {
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const [swipeable, setSwipeable] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteExpense = async () => {
    try {
      setLoading(true);
      const res = await deleteExpenseAPI(data?._id);
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

  return me?._id === data?.user?._id ? (
    <Swipeable
      onRef={(ref) => setSwipeable(ref)}
      onSwipeRelease={() => setSwiped(data?._id)}
      rightButtons={[
        <Pressable
          style={tw`bg-red-600 m-1.5 w-15 rounded-full h-15 flex items-center justify-center`}
          onPress={deleteExpense}
        >
          {loading ? (
            <ActivityIndicator size={25} color="white" />
          ) : (
            <IonIcon name="trash" color="white" size={25} />
          )}
        </Pressable>,
      ]}
      leftButtons={[
        <Pressable
          style={tw`bg-green-600 m-1.5 w-15 rounded-full h-15 flex items-center justify-center right-0 absolute`}
          onPress={() => {
            setEdit(data);
            if (swipeable) swipeable.recenter();
          }}
        >
          {loading ? (
            <ActivityIndicator size={25} color="white" />
          ) : (
            <IonIcon name="pencil" color="white" size={25} />
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
