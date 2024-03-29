import {
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
// import { FloatingAction } from "react-native-floating-action";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { expenseTypes, primary } from "../../utils/common";
import PurchageItem from "../../components/PurchaseItem";
import FloatingOpt from "../../components/FloatingOpt";
import AddExpense from "../../components/AddExpense";
import { useEffect, useState } from "react";
import { expenseListAPI } from "../../api/apis";
import SelectProfile from "../../components/SelectProfile";
import { useIsFocused } from "@react-navigation/native";
import TopBar from "../../components/Topbar";

const Home = ({ navigation }) => {
  const [to, setTo] = useState(expenseTypes.team);
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState();
  const [list, setList] = useState([]);

  // const actions = [
  //   {
  //     render: () => <FloatingOpt type={expenseTypes.own} />,
  //     name: expenseTypes.own,
  //     position: 2,
  //   },
  //   {
  //     render: () => <FloatingOpt type={expenseTypes.team} />,
  //     name: expenseTypes.team,
  //     position: 1,
  //   },
  // ];

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

  useEffect(() => {
    if (!visible) expenseList({ date, to });
  }, [visible, date, to]);

  useEffect(() => {
    setTo(navigation.getState().index ? expenseTypes.own : expenseTypes.team);
  }, [isFocused]);

  return (
    <View>
      <TopBar date={date} setDate={setDate} />
      <ScrollView
        // onTouchStart={(e) =>
        //   console.log(e.nativeEvent.pageY, e.nativeEvent.pageX)
        // }
        // onTouchEnd={(e) => {
        //   console.log(e.nativeEvent.pageY, e.nativeEvent.pageX);
        // }}
        style={tw`h-[${(Dimensions.get("window").height * 0.951) / 4}]`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => expenseList({ date, to })}
          />
        }
      >
        {list?.length ? (
          list.map((data) => <PurchageItem data={data} key={data?.createdAt} />)
        ) : (
          <Text style={tw`text-center text-base mt-56`}>
            There are no any expenses in this month
          </Text>
        )}
      </ScrollView>
      {/* <FloatingAction
        // actions={actions}
        // onPressItem={(name) => setVisible(name)}
        onPressMain={() => setVisible(to)}
        distanceToEdge={{ vertical: 70, horizontal: 10 }}
        actionsPaddingTopBottom={0}
        color={primary}
      /> */}
      <Pressable
        style={tw`absolute bottom-16 right-3 bg-[${primary}] p-4 rounded-full shadow`}
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
