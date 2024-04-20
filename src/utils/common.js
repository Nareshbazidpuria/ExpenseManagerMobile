// import { Platform } from "react-native";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";

export const primary = "#00807b";
// export const primary = "#6e0b65";

export const users = [
  "Naresh Bazidpuria",
  "Sanjay Nandiwal",
  "Satwinder Shergill",
  "Himanshu Bisht",
];

export const expenseTypes = {
  own: "own",
  team: "team",
};

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// export const registerPush = async () => {
//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (Device.isDevice) {
//     return Notifications.getDevicePushTokenAsync();
//     // return Notifications.getExpoPushTokenAsync({
//     //   projectId: "324ccdf7-4645-41cf-9b98-7eef76447c27",
//     // });
//   }
// };
