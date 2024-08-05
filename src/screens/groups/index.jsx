import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/common";
import { useEffect, useState } from "react";
import { groupListAPI } from "../../api/apis";
import Group from "./Group";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoInternet from "../../components/NoInternet";
import { useIsFocused } from "@react-navigation/native";
import IonIcon from "@expo/vector-icons/Ionicons";
import { alertListAPI } from "../../api/notification";
import { editProfileAPI } from "../../api/auth";

const Groups = ({ navigation }) => {
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [me, setMe] = useState();
  const [list, setList] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [visible, setVisible] = useState();
  const [selected, setSelected] = useState([]);

  const groupList = async () => {
    let data = [];
    try {
      setSelected([]);
      setRefreshing(true);
      const res = await groupListAPI({ hidden: false });
      if (res?.status === 200) data = res?.data?.data;
    } catch (error) {
      console.log(error?.data || error);
    } finally {
      setList(data);
      setRefreshing(false);
    }
  };

  const hide = async () => {
    try {
      const res = await editProfileAPI({
        hiddenGroups: selected,
        type: "hide",
      });
      if (res?.status === 200) {
        groupList();
        message(res.data.message);
      }
    } catch (error) {
      console.log(error?.data || error);
    } finally {
    }
  };

  const getUnreadNotificationsCount = async () => {
    let count = 0;
    try {
      const res = await alertListAPI({ unread: true });
      if (res?.status === 200) count = res.data?.data?.[0]?.count;
    } catch (error) {
      console.log(error?.data || error);
    } finally {
      setUnreadCount(count);
    }
  };

  const checkLoggedIn = async () => {
    const loggedIn = await AsyncStorage.getItem("user");
    if (!loggedIn) navigation?.navigate("Login");
    else setMe(JSON.parse(loggedIn));
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
    <View>
      <View
        style={tw`p-2 bg-[${primary}] flex flex-row justify-between items-center`}
      >
        <Text style={tw`text-2xl text-white font-semibold`}>Groups</Text>
        {me && (
          <View style={tw`flex flex-row items-center gap-1`}>
            <Text
              style={tw`text-base text-white font-normal`}
              onPress={() => navigation.navigate("Profile")}
            >
              Hi,&nbsp;
              <Text style={tw`text-base font-semibold`}>
                {me?.name?.replace(/"/g, "")}
              </Text>
            </Text>
            {!!unreadCount && (
              <View style={tw`bg-white rounded-full px-1.7 py-.5`}>
                <Text style={tw`text-xs font-semibold text-[${primary}]`}>
                  {unreadCount}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
      <ScrollView
        style={tw`h-[${(Dimensions.get("window").height * 0.9) / 4}]`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              groupList();
              getUnreadNotificationsCount();
            }}
          />
        }
      >
        {list?.length ? (
          <>
            {list.map(
              (data, i) =>
                data?.members?.length > 2 && (
                  <Group
                    key={"groups-" + i}
                    data={data}
                    navigation={navigation}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )
            )}
            {list.some((data) => data?.members?.length === 2) && (
              <Text
                style={tw`p-2 text-base bg-[${primary}] text-white font-bold`}
              >
                Personal
              </Text>
            )}
            {list.map(
              (data, i) =>
                data?.members?.length === 2 && (
                  <Group
                    key={"groups-" + i}
                    data={data}
                    navigation={navigation}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )
            )}
          </>
        ) : (
          <View
            style={tw`flex h-[${
              Dimensions.get("window").height / 4.5
            }] items-center justify-center bg-[#f2f2f2]`}
          >
            <IonIcon name="folder-open-outline" size={70} />
            <Text style={tw`text-lg font-semibold`}>No Records</Text>
          </View>
        )}
      </ScrollView>
      <NoInternet visible={visible} setVisible={setVisible} />
      {selected.length ? (
        <View style={tw`absolute bottom-8 right-3 flex flex-row gap-2`}>
          <Pressable
            style={tw`bg-[${primary}] p-4 rounded-full shadow`}
            onPress={setSelected.bind({}, [])}
          >
            <IonIcon color="white" name="close" size={28} />
          </Pressable>
          <Pressable
            style={tw`bg-[${primary}] p-4 rounded-full shadow`}
            onPress={hide}
          >
            <IonIcon color="white" name="eye-off" size={28} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={tw`absolute bottom-10 right-3 bg-[${primary}] p-4 rounded-full shadow`}
          onPress={() => navigation.navigate("CreateGroup")}
        >
          <IonIcon color="white" name="add" size={28} />
        </Pressable>
      )}
    </View>
  );
};

export default Groups;
