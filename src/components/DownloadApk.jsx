// import {
//   Alert,
//   BackHandler,
//   Dimensions,
//   Image,
//   Text,
//   View,
// } from "react-native";
// import * as FileSystem from "expo-file-system";
// import { baseURL } from "../api/axios";
// import { useEffect, useState } from "react";
// import { ProgressBar } from "rn-inkpad";
// import { primary } from "../utils/common";
// import tw from "twrnc";
// import Bicon from "./Bicon";
// import em from "../assets/favicon.png";

// const { StorageAccessFramework } = FileSystem;

// const DownloadApk = ({ route, navigation }) => {
//   const { size, version } = route?.params || {};
//   const [progress, setProgress] = useState(0);

//   const saveAndroidFile = async (fileUri, fileName = "ExpenseManager.apk") => {
//     try {
//       const fileString = await FileSystem.readAsStringAsync(fileUri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       const permissions =
//         await StorageAccessFramework.requestDirectoryPermissionsAsync();
//       if (!permissions.granted) return;
//       try {
//         await StorageAccessFramework.createFileAsync(
//           permissions.directoryUri,
//           fileName,
//           "apk"
//         )
//           .then(async (uri) => {
//             await FileSystem.writeAsStringAsync(uri, fileString, {
//               encoding: FileSystem.EncodingType.Base64,
//             });
//             Alert.alert(
//               "Updates downloaded",
//               "Go to file manager and and install new updates from 'ExpenseManager.apk'",
//               [
//                 {
//                   text: "Exit App",
//                   style: "destructive",
//                   onPress: () => BackHandler.exitApp(),
//                 },
//               ]
//             );
//           })
//           .catch((e) => {
//             alert(
//               "Update not downloaded, please contact 'supp.expense.manager@gmail.com'"
//             );
//           });
//       } catch (e) {}
//     } catch (err) {}
//   };

//   const downloadFile = async () => {
//     const fileUri = FileSystem.documentDirectory + "ExpenseManager.apk";
//     const downloadResumable = FileSystem.createDownloadResumable(
//       baseURL + "/pub/download",
//       fileUri,
//       {},
//       (downloadProgress) => setProgress(downloadProgress.totalBytesWritten)
//     );

//     try {
//       const { uri } = await downloadResumable.downloadAsync();
//       saveAndroidFile(uri);
//     } catch (e) {
//       Alert.alert(
//         "Discard changes?",
//         "You have unsaved changes. Are you sure to discard them and leave the screen?",
//         [
//           { text: "Don't leave", style: "cancel", onPress: () => {} },
//           {
//             text: "Discard",
//             style: "destructive",
//           },
//         ]
//       );
//     }
//   };

//   useEffect(
//     () =>
//       navigation.addListener("beforeRemove", (e) => {
//         e.preventDefault();
//         Alert.alert(
//           "Update Expense Manager",
//           "You can't go back from this screen. Either update app or exit.",
//           [
//             { text: "Update", style: "destructive", onPress: downloadFile },
//             {
//               text: "Exit",
//               style: "destructive",
//               onPress: () => BackHandler.exitApp(),
//             },
//           ]
//         );
//       }),
//     [navigation]
//   );

//   return (
//     <View>
//       <View
//         style={tw`p-2 bg-[${primary}] flex flex-row justify-between items-center`}
//       >
//         <Text style={tw`text-2xl text-white font-semibold`}>
//           App Update Center
//         </Text>
//       </View>
//       <View
//         style={tw`bg-white h-[${
//           Dimensions.get("window").height / 4
//         }] flex p-3 gap-3 items-center`}
//       >
//         <Image source={em} style={tw`h-40 w-40 mt-30`} />
//         <Text style={tw`font-bold text-xl text-center`}>
//           Expense Manager ({version})
//         </Text>
//         <Text
//           style={tw`font-bold text-base leading-5 text-gray-500 text-center px-6`}
//         >
//           Newer version of expense manager is now available. Download and
//           install from your file manager.
//         </Text>
//         {!!progress ? (
//           <ProgressBar
//             value={(progress / (size || 1)) * 100}
//             rounded
//             progressColor={primary}
//             showPercent
//             backgroundColor="#eeeeee"
//             textColor="#ffffff"
//           />
//         ) : (
//           <View>
//             <Bicon
//               title="Download APK"
//               cls="w-32"
//               onPress={downloadFile}
//               txtCls="font-bold text-base"
//             />
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default DownloadApk;
