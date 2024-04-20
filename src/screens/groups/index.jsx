import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/common";
import { useEffect, useState } from "react";
import { groupListAPI } from "../../api/apis";
import SelectProfile from "../../components/SelectProfile";
import empty from "../../assets/empty.gif";
import Group from "./Group";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Groups = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState();
  const [me, setMe] = useState();
  const [list, setList] = useState([]);

  const findMe = async () => {
    setMe(JSON.parse((await AsyncStorage.getItem("user")) || "{}"));
  };

  const groupList = async () => {
    let data = [];
    try {
      setRefreshing(true);
      const res = await groupListAPI();
      if (res?.status === 200) data = res?.data?.data;
    } catch (error) {
      console.log("error", error);
    } finally {
      findMe();
      setList(data);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    groupList();
  }, [refresh]);

  return (
    <View>
      <View
        style={tw`p-2 bg-[${primary}] flex flex-row justify-between items-center`}
      >
        <Text style={tw`text-2xl text-white font-semibold`}>Groups</Text>
        {me && (
          <Text style={tw`text-base text-white font-normal`}>
            Hi, <Text style={tw`text-base font-semibold`}>{me.name}</Text>
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
      <SelectProfile setRefresh={setRefresh} />
    </View>
  );
};

export default Groups;
