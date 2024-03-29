import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

// export const primary = "#00654A";
export const primary = "#6e0b65";

export const expenseTypes = {
  own: "own",
  team: "team",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const registerPush = async () => {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    return Notifications.getExpoPushTokenAsync({
      projectId: "324ccdf7-4645-41cf-9b98-7eef76447c27",
    });
  }
};
