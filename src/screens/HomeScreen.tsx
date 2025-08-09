import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  backgroundLight,
  expenseTypes,
  primary,
  screens,
} from '../utils/global';
import { RootStackParamList } from '../utils/types';
import TopBar from '../components/TopBar';
import Group from '../components/Group';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { groupListAPI, groupListHomeAPI } from '../api/apis';
import { editProfileAPI } from '../api/auth';
import { alertListAPI } from '../api/notification';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthUser } from '../redux/auth';
import { navigationRef } from '../navigation/AppNavigator';
import { RootState } from '../redux/store';

const HomeScreen: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.authUser);
  const [selected, setSelected] = useState<string[]>([]);

  const message = (msg: string) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const groupList = async () => {
    setLoading(true);

    let data = [
      {
        _id: expenseTypes.own,
        name: `${authUser?.name} (You)`,
        own: `${authUser?.name} (You)`,
        unverifiedCount: 0,
        type: expenseTypes.own,
      },
    ];
    try {
      setSelected([]);
      // const res = await groupListAPI({ hidden: false });
      const res = await groupListHomeAPI();
      if (res?.status === 200) data = [...data, ...res?.data?.data];
    } catch (error) {
      // console.log(error?.data || error);
    } finally {
      setList(data);
      setLoading(false);
    }
  };

  const hide = async () => {
    try {
      const res = await editProfileAPI({
        hiddenGroups: selected,
        type: 'hide',
      });
      if (res?.status === 200) {
        groupList();
        message(res.data.message);
      }
    } catch (error) {
      // console.log(error?.data || error);
    } finally {
    }
  };

  const getUnreadNotificationsCount = async () => {
    let count = 0;
    try {
      const res = await alertListAPI({ unread: true });
      if (res?.status === 200) count = res.data?.data?.[0]?.count;
    } catch (error) {
      // console.log(error?.data || error);
    } finally {
      setUnreadCount(count);
    }
  };

  const checkLoggedIn = async () => {
    if (!authUser) {
      const loggedIn = await AsyncStorage.getItem('user');
      if (!loggedIn) navigationRef?.navigate(screens.Login);
      else dispatch(setAuthUser(JSON.parse(loggedIn)));
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, [isFocused, refreshing]);

  useEffect(() => {
    if (authUser) {
      groupList();
      getUnreadNotificationsCount();
    }
  }, [authUser]);

  return (
    <>
      <TopBar
        name="Expenses"
        extra={
          <View className="flex-row items-center gap-5">
            <Pressable
              className="relative flex items-center justify-center"
              onPress={() => navigation.navigate(screens.QR, { tab: 'Scan' })}
            >
              <IonIcon
                className="absolute"
                name="scan"
                size={25}
                color="#fff"
              />
              <IonIcon
                name="qr-code"
                size={15}
                color="#fff"
                className="absolute"
              />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(screens.Notifications)}
              className="flex-row items-center gap-1"
            >
              <IonIcon name="notifications" size={24} color="#fff" />
              {unreadCount > 0 && (
                <View className="absolute -right-1 -top-1 bg-red-500 rounded-full px-1  py-0.5">
                  <Text className="text-white text-xs">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        }
      />

      <ScrollView
        className="flex-1"
        style={{ backgroundColor: backgroundLight }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              groupList();
              setRefreshing(false);
            }}
            colors={[primary]}
          />
        }
      >
        {loading ? (
          <View
            className={`fle items-center justify-center bg-[#f2f2f2]`}
            style={{ height: Dimensions.get('window').height - 100 }}
          >
            <ActivityIndicator size="large" color={primary} />
          </View>
        ) : list?.length ? (
          <>
            {list.map((data, i) => (
              <Group
                key={'groups-' + i}
                data={data}
                navigation={navigation}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
            <View className="h-24" />
          </>
        ) : (
          <View
            className={`flex items-center justify-center bg-[#f2f2f2]`}
            style={{ height: Dimensions.get('window').height - 100 }}
          >
            <IonIcon name="folder-open-outline" size={70} />
            <Text className={`text-lg font-semibold`}>No Records</Text>
          </View>
        )}
      </ScrollView>
      {selected.length ? (
        <View
          className={`absolute right-3 flex flex-row gap-2`}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ bottom: Platform.OS === 'ios' ? 80 : 70 }}
        >
          <Pressable
            className="p-3 rounded-full shadow"
            style={{ backgroundColor: primary }}
            onPress={setSelected.bind({}, [])}
          >
            <IonIcon color="white" name="close" size={28} />
          </Pressable>
          <Pressable
            className="p-3 rounded-full shadow"
            style={{ backgroundColor: primary }}
            onPress={hide}
          >
            <IonIcon color="white" name="eye-off" size={28} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          className="absolute right-3 p-3 rounded-full shadow"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: primary,
            bottom: Platform.OS === 'ios' ? 80 : 70,
          }}
          onPress={() => navigation.navigate('CreateGroup')}
        >
          <IonIcon color="white" name="add" size={28} />
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;
