import {
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/common";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertItem from "./AlertItem";
import { alertListAPI, readAllAlertAPI } from "../../api/notification";

const Notifications = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [alerts, setAlerts] = useState([]);
  const [refreshing, setRefreshing] = useState();
  const [unread, setUnread] = useState([]);

  const getAlerts = async () => {
    let data = [];
    try {
      setRefreshing(true);
      const res = await alertListAPI();
      if (res?.status === 200) data = res.data?.data;
    } catch (error) {
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
    } catch (error) {
      console.log(error?.data || error);
    }
  };

  const checkLoggedIn = async () => {
    const loggedIn = await AsyncStorage.getItem("user");
    if (!loggedIn) navigation?.navigate("Login");
    else getAlerts();
  };

  useEffect(() => {
    checkLoggedIn();
  }, [isFocused]);

  useEffect(() => {
    setUnread(alerts?.filter(({ unread }) => unread)?.map(({ _id }) => _id));
  }, [alerts]);

  return (
    <View>
      <View
        style={tw`p-2 bg-[${primary}] flex flex-row justify-between items-center`}
      >
        <Text style={tw`text-2xl text-white font-semibold`}>Notifications</Text>
        {!!unread?.length && (
          <Text style={tw`text-white font-semibold`} onPress={onPress}>
            Mark all as read
          </Text>
        )}
      </View>
      <ScrollView
        style={tw`h-[${
          (Dimensions.get("window").height * (alerts?.length ? 0.96 : 0.9)) / 4
        }]`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAlerts} />
        }
      >
        {alerts?.map((alert, i) => (
          <AlertItem key={"alert-" + i} alert={alert} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Notifications;
