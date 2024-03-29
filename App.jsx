import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { primary } from "./src/utils/common";
import HomeScreen from "./src/routes/Screens";
import { PermissionsAndroid } from "react-native";

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
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
