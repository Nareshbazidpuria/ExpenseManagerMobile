import React from 'react';
import { View, Pressable, ActivityIndicator } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import IonIcon from 'react-native-vector-icons/Ionicons';
import PurchageItem from './PurchaseItem';

const SwipeList = ({ data, loading, deleteExpense, setEdit }) => {
  const renderHiddenItem = ({ item }) =>
    item._id !== 'space' && (
      <View className="flex-row justify-between items-center px-3 h-full bg-gray-100">
        {/* Left Edit Button */}
        <Pressable
          className="bg-green-600 w-15 h-15 rounded-full items-center justify-center p-4"
          onPress={() => setEdit(item)}
        >
          {loading ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <IonIcon name="pencil" size={20} color="white" />
          )}
        </Pressable>

        {/* Right Delete Button */}
        <Pressable
          className="bg-red-600 w-15 h-15 rounded-full items-center justify-center p-4"
          onPress={() => deleteExpense(item._id)}
        >
          {loading ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <IonIcon name="trash" size={20} color="white" />
          )}
        </Pressable>
      </View>
    );

  return (
    <SwipeListView
      data={[...data, { _id: 'space' }]}
      className="h-[90%]"
      keyExtractor={item => item._id}
      renderItem={({ item }) =>
        item._id === 'space' ? (
          <View className="h-28" />
        ) : (
          <PurchageItem data={item} />
        )
      }
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-75}
      disableRightSwipe={false}
      disableLeftSwipe={false}
    />
  );
};

export default SwipeList;
