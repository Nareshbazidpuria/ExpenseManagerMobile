import {
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { alertListAPI, readAllAlertAPI } from '../api/notification';
import AlertItem from '../components/AlertItem';
import TopBar from '../components/TopBar';

interface Props {
  navigation: any;
}

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [alerts, setAlerts] = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [unread, setUnread] = useState([]);

  const getAlerts = async () => {
    let data = [];
    try {
      setRefreshing(true);
      const res = await alertListAPI();
      if (res?.status === 200) data = res.data?.data;
    } catch (error: any) {
      console.log(error?.data || error);
    } finally {
      setAlerts(data);
      setRefreshing(false);
    }
  };

  const onPress = async () => {
    try {
      const res = await readAllAlertAPI({ ids: unread });
      if (res?.status === 200) getAlerts();
    } catch (error: any) {
      console.log(error?.data || error);
    }
  };

  const checkLoggedIn = async () => {
    const loggedIn = await AsyncStorage.getItem('user');
    if (!loggedIn) navigation?.navigate('Login');
    else getAlerts();
  };

  useEffect(() => {
    checkLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    setUnread(
      alerts?.filter((push: any) => push.unread)?.map(({ _id }) => _id),
    );
  }, [alerts]);

  return (
    <View>
      <TopBar
        name="Notifications"
        extra={
          !!unread?.length && (
            <Text className={`text-white font-semibold`} onPress={onPress}>
              Mark all as read
            </Text>
          )
        }
      />

      <ScrollView
        className={`h-[${
          (Dimensions.get('window').height * (alerts?.length ? 0.96 : 0.9)) / 4
        }]`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAlerts} />
        }
      >
        {alerts?.map((alert, i) => (
          <AlertItem key={'alert-' + i} alert={alert} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
