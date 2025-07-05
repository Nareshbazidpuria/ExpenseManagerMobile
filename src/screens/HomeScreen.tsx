import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { backgroundLight, primary } from '../utils/global';
import { RootStackParamList } from '../utils/types';
import TopBar from '../components/TopBar';
import Group from '../components/Group';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { groupListAPI } from '../api/apis';
import { editProfileAPI } from '../api/auth';
import { alertListAPI } from '../api/notification';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = { navigation: NavigationProp };

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const message = (msg: string) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [me, setMe] = useState();
  const [list, setList] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [visible, setVisible] = useState();

  const groupList = async () => {
    let data = [];
    try {
      setSelected([]);
      setRefreshing(true);
      const res = await groupListAPI({ hidden: false });
      if (res?.status === 200) data = res?.data?.data;
    } catch (error) {
      // console.log(error?.data || error);
    } finally {
      setList(data);
      setRefreshing(false);
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
    // const loggedIn = await AsyncStorage.getItem('user');
    // if (!loggedIn) {
    //   // navigation?.navigate('Login');
    // } else setMe(JSON.parse(loggedIn));
  };

  useEffect(() => {
    checkLoggedIn();
    setSelected([]);
  }, [isFocused, refreshing]);

  useEffect(() => {
    groupList();
    getUnreadNotificationsCount();
  }, [isFocused, visible]);

  return (
    <>
      <TopBar name="Groups" search />

      <ScrollView
        className="flex-1"
        style={{ backgroundColor: backgroundLight }}
      >
        {list?.length ? (
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
          </>
        ) : (
          <View
            className={`flex h-[${
              Dimensions.get('window').height / 4.5
            }] items-center justify-center bg-[#f2f2f2]`}
          >
            <IonIcon name="folder-open-outline" size={70} />
            <Text className={`text-lg font-semibold`}>No Records</Text>
          </View>
        )}
        <View className="h-24" />
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
