import {
  Dimensions,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { expenseListAPI } from '../api/apis';
import { useIsFocused } from '@react-navigation/native';
import SwipeComp from '../components/SwipeComp';
// import { AsyncStorage } from 'react-native';
import { primary, expenseTypes } from '../utils/global';
import AddExpense from '../components/AddExpense';
import DateSelector from '../components/DateSelector';

const ExpensesScreen = ({ route, navigation }) => {
  const { data } = route.params || {};
  const [to] = useState(data?.name || expenseTypes.own);
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState();
  const [list, setList] = useState([]);
  const [swiped, setSwiped] = useState();
  const [me, setMe] = useState();
  const [deleted, setDeleted] = useState();
  const [edit, setEdit] = useState();

  const expenseList = async params => {
    let resp = [];
    try {
      if (params?.to && params?.to === data?.name) params.to = data._id;
      setRefreshing(true);
      const res = await expenseListAPI(params);
      if (res?.status === 200) resp = res?.data?.data;
    } catch (error) {
      console.log('error', error);
    } finally {
      setList(resp);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!visible) expenseList({ date, to });
  }, [visible, date, to]);

  useEffect(() => {
    if (deleted) expenseList({ date, to });
  }, [deleted]);

  // const checkLoggedIn = async () => {
  //   const loggedIn = await AsyncStorage.getItem('user');
  //   if (!loggedIn) navigation?.navigate('Login');
  //   else setMe(JSON.parse(loggedIn));
  // };

  // useEffect(() => {
  //   checkLoggedIn();
  // }, [isFocused]);

  return (
    <View>
      <View className={`flex flex-row`}>
        {to !== expenseTypes.own && (
          <Pressable
            className={`p-2 w-1/2`}
            style={{ backgroundColor: primary }}
            onPress={() =>
              !data?.memberss?.[0]?.name &&
              navigation.navigate('GroupDetails', { id: data?._id })
            }
          >
            <Text
              numberOfLines={1}
              className={`text-lg text-white font-semibold`}
            >
              {data?.memberss?.[0]?.name || to}
            </Text>
            {!data?.memberss?.[0]?.name && (
              <Text className={`text-xs text-white`}>
                {data?.members?.length} members
              </Text>
            )}
          </Pressable>
        )}
        <DateSelector
          date={date}
          setDate={setDate}
          cls={to === expenseTypes.own ? 'w-full' : 'w-1/2'}
        />
      </View>
      <ScrollView
        style={{ height: Dimensions.get('window').height - 120 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => expenseList({ date, to })}
          />
        }
      >
        {list?.length ? (
          <>
            {list.map((data, i) => (
              <SwipeComp
                data={data}
                key={'swiipee-' + i}
                swiped={swiped}
                setSwiped={setSwiped}
                me={me}
                setDeleted={setDeleted}
                setEdit={setEdit}
              />
            ))}
            <View className={`h-32`} />
          </>
        ) : (
          <View
            className={`flex items-center justify-center bg-[#f2f2f2]`}
            style={{ height: Dimensions.get('window').height - 200 }}
          >
            <IonIcon name="folder-open-outline" size={70} />
            <Text className={`text-lg font-semibold`}>No Records</Text>
          </View>
        )}
      </ScrollView>
      <Pressable
        className="absolute bottom-10 right-3 p-3 rounded-full shadow"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: primary,
        }}
        onPress={() => setVisible(data || to)}
      >
        <IonIcon color="white" name="add" size={28} />
      </Pressable>
      <AddExpense
        visible={visible}
        setVisible={setVisible}
        edit={edit}
        setEdit={setEdit}
      />
    </View>
  );
};

export default ExpensesScreen;
