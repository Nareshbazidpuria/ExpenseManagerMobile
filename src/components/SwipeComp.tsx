import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, ActivityIndicator } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import IonIcon from 'react-native-vector-icons/Ionicons';
import PurchageItem from './PurchaseItem';
import { useNavigation } from '@react-navigation/native';
import { expenseTypes, screens } from '../utils/global';
import { deleteExpenseAPI, verifyExpenseAPI } from '../api/apis';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { message } from '../utils/common';

const SwipeList = ({ data, group, refreshControl }) => {
  const listRef = useRef(null);
  const [list, setList] = useState(data);
  const [loading, setLoading] = useState<{
    delete: boolean;
    verify: Record<string, any>;
  }>({ delete: false, verify: {} });
  const authUser = useSelector((state: RootState) => state.authUser);

  const reCenter = () =>
    listRef.current && listRef.current.safeCloseOpenRow?.();

  const deleteExpense = async id => {
    try {
      setLoading(prev => ({ ...prev, delete: true }));
      const res = await deleteExpenseAPI(id);
      if (res?.status === 200) {
        message(res?.data?.message || 'Deleted successfully');
        setList(list.filter(i => i._id !== id));
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message, 'error');
      else console.log(error);
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
      reCenter();
    }
  };

  const verifyExpense = async id => {
    try {
      setLoading(prev => ({ ...prev, verify: { ...prev.verify, [id]: true } }));
      const res = await verifyExpenseAPI(id);
      if (res?.status === 200) {
        // message(res?.data?.message);
        message(res?.data?.message || 'Verified successfully');
        if (list[0].expenseType === expenseTypes.friend)
          setList(
            list.map(i =>
              i._id === id
                ? {
                    ...i,
                    verifiedBy: [...i.verifiedBy, authUser?._id],
                    verified: true,
                  }
                : i,
            ),
          );
        else
          setList(
            list.map(i =>
              i._id === id
                ? {
                    ...i,
                    verifiedBy: [...i.verifiedBy, authUser?._id],
                    verified:
                      i.verifiedBy?.length + 1 === group?.members?.length,
                  }
                : i,
            ),
          );
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message);
      else console.log(error);
    } finally {
      setLoading(prev => ({
        ...prev,
        verify: { ...prev.verify, [id]: false },
      }));
    }
  };

  const navigation = useNavigation();
  const renderHiddenItem = ({ item }) =>
    item._id !== 'space' &&
    item.user?._id === authUser?._id && (
      <View className="flex-row justify-between items-center px-3 h-full bg-gray-100">
        {/* Left Edit Button */}
        <Pressable
          className="bg-green-600 w-15 h-15 rounded-full items-center justify-center p-4"
          onPress={() => {
            reCenter();
            navigation.navigate(screens.AddExpense, {
              id: item._id,
              data: group,
            });
          }}
        >
          <IonIcon name="pencil" size={20} color="white" />
        </Pressable>

        {/* Right Delete Button */}
        <Pressable
          className="bg-red-600 w-15 h-15 rounded-full items-center justify-center p-4"
          onPress={async () => deleteExpense(item._id)}
        >
          {loading.delete ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <IonIcon name="trash" size={20} color="white" />
          )}
        </Pressable>
      </View>
    );

  useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <SwipeListView
      ref={listRef}
      data={[...list, { _id: 'space' }]}
      className="h-[90%]"
      keyExtractor={item => item._id}
      renderItem={({ item }) =>
        item._id === 'space' ? (
          <View className="h-28" />
        ) : (
          <PurchageItem
            data={item}
            loading={loading.verify[item._id]}
            key={item._id}
            verifyExpense={verifyExpense}
          />
        )
      }
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-75}
      disableRightSwipe={false}
      disableLeftSwipe={false}
      refreshControl={refreshControl}
    />
  );
};

export default SwipeList;
