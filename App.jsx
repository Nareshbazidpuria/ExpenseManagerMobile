import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { primary } from "./src/utils/common";
import { PermissionsAndroid } from "react-native";
import LoginSignup from "./src/screens/login";
import Expenses from "./src/screens/expenses";
import Home from "./src/routes/Screens";
import Profile from "./src/screens/profile";
import CreateGroup from "./src/screens/groups/CreateGroup";
import GroupDetails from "./src/screens/groups/GroupDetails";

export let navigateRef;

const App = () => {
  const Stack = createNativeStackNavigator();
  navigateRef = useRef();

  const takePermissions = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (!granted)
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
  };

  useEffect(() => {
    takePermissions();
  }, []);

  return (
    <NavigationContainer ref={navigateRef}>
      <StatusBar style="light" translucent={false} backgroundColor={primary} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Screen name="Login" component={LoginSignup} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="GroupDetails" component={GroupDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
