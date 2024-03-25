import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home";
import TabBar from "../components/TabBar";
import Report from "../screens/report";

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <Tab.Navigator
    tabBar={(props) => <TabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Team" component={Home} />
    <Tab.Screen name="Own" component={Home} />
    <Tab.Screen name="Report" component={Report} />
  </Tab.Navigator>
);

export default HomeScreen;
