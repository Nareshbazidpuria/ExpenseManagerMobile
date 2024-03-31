import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { expenseTypes, primary } from "../../utils/common";
import AddExpense from "../../components/AddExpense";
import { useEffect, useState } from "react";
import { expenseListAPI } from "../../api/apis";
import SelectProfile from "../../components/SelectProfile";
import { useIsFocused } from "@react-navigation/native";
import TopBar from "../../components/Topbar";
import SwipeComp from "../../components/SwipeComp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import empty from "../../assets/empty.gif";

const Home = ({ navigation }) => {
  const [to, setTo] = useState(expenseTypes.team);
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState();
  const [list, setList] = useState([]);
  const [swiped, setSwiped] = useState();
  const [me, setMe] = useState();
  const [deleted, setDeleted] = useState();

  const expenseList = async (params) => {
    let data = [];
    try {
      setRefreshing(true);
      const res = await expenseListAPI(params);
      if (res?.status === 200) data = res?.data?.data;
    } catch (error) {
      console.log("error", error);
    } finally {
      setList(data);
      setRefreshing(false);
    }
  };

  const findMe = async () => {
    setMe(await AsyncStorage.getItem("user"));
  };

  useEffect(() => {
    if (!visible) expenseList({ date, to });
  }, [visible, date, to]);

  useEffect(() => {
    if (deleted) expenseList({ date, to });
  }, [deleted]);

  useEffect(() => {
    findMe();
    setTo(navigation.getState().index ? expenseTypes.own : expenseTypes.team);
  }, [isFocused]);

  return (
    <View>
      <TopBar date={date} setDate={setDate} />
      <ScrollView
        style={tw`h-[${(Dimensions.get("window").height * 0.9) / 4}]`}
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
        style={tw`absolute bottom-5 right-3 bg-[${primary}] p-4 rounded-full shadow`}
        onPress={() => setVisible(to)}
      >
        <IonIcon color="white" name="add" size={28} />
      </Pressable>
      <AddExpense visible={visible} setVisible={setVisible} />
      <SelectProfile />
    </View>
  );
};

export default Home;
