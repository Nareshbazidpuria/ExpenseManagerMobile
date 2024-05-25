import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../components/TabBar";
import Report from "../screens/report";
import Groups from "../screens/groups";
import Expenses from "../screens/expenses";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const checkLoggedIn = async () => {
    const loggedIn = await AsyncStorage.getItem("user");
    if (!loggedIn) navigation?.navigate("Login");
  };

  useEffect(() => {
    checkLoggedIn();
  });

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen name="Own" component={Expenses} />
      <Tab.Screen name="Report" component={Report} />
    </Tab.Navigator>
  );
};

export default Home;
