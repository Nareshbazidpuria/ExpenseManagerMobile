import { Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { primary } from "../../utils/common";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const checkLoggedIn = async () => {
    const loggedIn = await AsyncStorage.getItem("user");
    if (!loggedIn) navigation?.navigate("Login");
  };

  useEffect(() => {
    checkLoggedIn();
  }, [isFocused]);

  return (
    <View
      style={tw`p-2 bg-[${primary}] flex flex-row justify-between items-center`}
    >
      <Text style={tw`text-2xl text-white font-semibold`}>Profile</Text>
    </View>
  );
};

export default Profile;
