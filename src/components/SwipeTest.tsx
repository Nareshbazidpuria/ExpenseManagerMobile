import React from 'react';
import { View, Pressable, ActivityIndicator } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import IonIcon from 'react-native-vector-icons/Ionicons';

const SwipeList = ({ data, loading, deleteExpense, setEdit, PurchageItem }) => {
  const renderItem = ({ item }) => (
    <View>
      <PurchageItem data={item} />
    </View>
  );

  const renderHiddenItem = ({ item }) => (
    <View className="flex-row justify-between items-center px-3 h-full bg-gray-100">
      {/* Left Edit Button */}
      <Pressable
        className="bg-green-600 w-15 h-15 rounded-full items-center justify-center p-4"
        onPress={() => setEdit(item)}
      >
        {loading ? (
          <ActivityIndicator size={25} color="white" />
        ) : (
          <IonIcon name="pencil" size={25} color="white" />
        )}
      </Pressable>

      {/* Right Delete Button */}
      <Pressable
        className="bg-red-600 w-15 h-15 rounded-full items-center justify-center p-4"
        onPress={() => deleteExpense(item._id)}
      >
        {loading ? (
          <ActivityIndicator size={25} color="white" />
        ) : (
          <IonIcon name="trash" size={25} color="white" />
        )}
      </Pressable>
    </View>
  );

  return (
    <SwipeListView
      data={[data]}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-75}
      disableRightSwipe={false}
      disableLeftSwipe={false}
    />
  );
};

export default SwipeList;
