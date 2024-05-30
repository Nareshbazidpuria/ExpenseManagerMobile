import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/common";
import { useEffect, useState } from "react";
import { groupListAPI } from "../../api/apis";
import empty from "../../assets/empty.gif";
import Group from "./Group";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoInternet from "../../components/NoInternet";
import { useIsFocused } from "@react-navigation/native";
import IonIcon from "@expo/vector-icons/Ionicons";

const Groups = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [me, setMe] = useState();
  const [list, setList] = useState([]);

  const groupList = async () => {
    let data = [];
    try {
      setRefreshing(true);
      const res = await groupListAPI();
      if (res?.status === 200) data = res?.data?.data;
    } catch (error) {
      console.log(error?.data || error);
    } finally {
      setList(data);
      setRefreshing(false);
    }
  };

  const checkLoggedIn = async () => {
    const loggedIn = await AsyncStorage.getItem("user");
    if (!loggedIn) navigation?.navigate("Login");
    else setMe(JSON.parse(loggedIn));
  };

  useEffect(() => {
    checkLoggedIn();
  }, [isFocused, refreshing]);

  useEffect(() => {
    groupList();
  }, [isFocused]);

  return (
    <View>
      <View
        style={tw`p-2 bg-[${primary}] flex flex-row justify-between items-center`}
      >
        <Text style={tw`text-2xl text-white font-semibold`}>Groups</Text>
        {me && (
          <Text
            style={tw`text-base text-white font-normal`}
            onPress={() => navigation.navigate("Profile")}
          >
            Hi,&nbsp;
            <Text style={tw`text-base font-semibold`}>
              {me?.name?.replace(/"/g, "")}
            </Text>
          </Text>
        )}
      </View>
      <ScrollView
        style={tw`h-[${(Dimensions.get("window").height * 0.9) / 4}]`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => groupList()}
          />
        }
      >
        {list?.length ? (
          list.map((data) => <Group data={data} navigation={navigation} />)
        ) : (
          <View
            style={tw`flex h-[${
              Dimensions.get("screen").height / 4.5
            }] items-center justify-center bg-white`}
          >
            <Image source={empty} style={tw`rounded-full w-80 h-80`} />
          </View>
        )}
      </ScrollView>
      <NoInternet />
      <Pressable
        style={tw`absolute bottom-8 right-3 bg-[${primary}] p-4 rounded-full shadow`}
        onPress={() => navigation.navigate("CreateGroup")}
      >
        <IonIcon color="white" name="add" size={28} />
      </Pressable>
    </View>
  );
};

export default Groups;
