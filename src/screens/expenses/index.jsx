import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { expenseTypes, primary } from "../../utils/common";
import AddExpense from "../../components/AddExpense";
import { useEffect, useState } from "react";
import { expenseListAPI } from "../../api/apis";
import { useIsFocused } from "@react-navigation/native";
import TopBar from "../../components/Topbar";
import SwipeComp from "../../components/SwipeComp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import empty from "../../assets/empty.gif";

const Expenses = ({ route, navigation }) => {
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

  const expenseList = async (params) => {
    let resp = [];
    try {
      if (params?.to && params?.to === data?.name) params.to = data._id;
      setRefreshing(true);
      const res = await expenseListAPI(params);
      if (res?.status === 200) resp = res?.data?.data;
    } catch (error) {
      console.log("error", error);
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

  const checkLoggedIn = async () => {
    const loggedIn = await AsyncStorage.getItem("user");
    if (!loggedIn) navigation?.navigate("Login");
    else setMe(JSON.parse(loggedIn));
  };

  useEffect(() => {
    checkLoggedIn();
  }, [isFocused]);

  return (
    <View>
      <View style={tw`flex flex-row`}>
        {to !== expenseTypes.own && (
          <Pressable
            style={tw`p-2 bg-[${primary}] w-1/2`}
            onPress={() => navigation.navigate("GroupDetails")}
          >
            <Text
              numberOfLines={1}
              style={tw`text-lg text-white font-semibold`}
            >
              {to}
            </Text>
            <Text style={tw`text-xs text-white`}>
              {data?.members?.length} members
            </Text>
          </Pressable>
        )}
        <TopBar
          date={date}
          setDate={setDate}
          cls={to === expenseTypes.own ? "w-full" : "w-1/2"}
        />
      </View>
      <ScrollView
        style={tw`h-[${
          (Dimensions.get("window").height * (data ? 0.96 : 0.9)) / 4
        }]`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => expenseList({ date, to })}
          />
        }
      >
        {list?.length ? (
          list.map((data) => (
            <SwipeComp
              data={data}
              key={data?.createdAt}
              swiped={swiped}
              setSwiped={setSwiped}
              me={me}
              setDeleted={setDeleted}
              setEdit={setEdit}
            />
          ))
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
      <Pressable
        style={tw`absolute bottom-8 right-3 bg-[${primary}] p-4 rounded-full shadow`}
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

export default Expenses;
