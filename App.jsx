import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { primary } from "./src/utils/common";
import HomeScreen from "./src/routes/Screens";
import { PermissionsAndroid } from "react-native";
import MyListItem from "./src/components/Test";
import messaging from "@react-native-firebase/messaging";

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

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  useEffect(() => {
    takePermissions();
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => console.log(1212, token));
    }
    messaging()
      .getInitialNotification()
      .then((d) => console.log(112211, d.notification));

    messaging().onNotificationOpenedApp((d) =>
      console.log("opend", d.notification)
    );

    messaging().setBackgroundMessageHandler((d) =>
      console.log("bagg", d.notification)
    );

    const unsubscribe = messaging().onMessage((d) =>
      console.log(43434, d.notification)
    );

    return unsubscribe;
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
        {/* <Stack.Screen name="HomeScreen" component={MyListItem} /> */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
