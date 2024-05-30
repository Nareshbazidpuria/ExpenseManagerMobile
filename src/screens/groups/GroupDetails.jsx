import { Pressable, Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { primary } from "../../utils/common";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutAPI, profileAPI } from "../../api/auth";
import Avatar from "../../components/Avatar";
import ProfileOpt from "../profile/ProfileOpt";

const GroupDetails = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    try {
      const res = await profileAPI();
      if (res?.status === 200) setProfile(res.data?.data);
    } catch (error) {
      console.log(error?.data || error);
    }
  };

  const logout = async () => {
    try {
      const res = await logoutAPI();
      if (res?.status === 200) {
        await AsyncStorage.clear();
        checkLoggedIn();
      }
    } catch (error) {
      console.log(error?.data || error);
    }
  };

  const checkLoggedIn = async () => {
    const loggedIn = await AsyncStorage.getItem("user");
    if (!loggedIn) navigation?.navigate("Login");
    else getProfile();
  };

  useEffect(() => {
    checkLoggedIn();
  }, [isFocused]);

  return (
    <View>
      <View
        style={tw`p-2 bg-[${primary}] flex flex-row justify-between items-center`}
      >
        <Text style={tw`text-2xl text-white font-semibold`}>Group Details</Text>
      </View>
      <View
        style={tw`p-5 flex flex-row items-center gap-5 border-b border-gray-300 `}
      >
        <Avatar value={profile.name} w={20} />
        <View>
          <Text style={tw`text-lg font-bold`}>{profile.name}</Text>
          <Text>{profile.email}</Text>
        </View>
      </View>
      <ProfileOpt
        label="Secret Code"
        value={profile.secretCode}
        icon="lock-closed"
      />
      <ProfileOpt
        label="Monthly Expense Limit"
        value="Not Set"
        icon="calendar-number"
      />
      <ProfileOpt label="Change Password" icon="key" />
      <ProfileOpt label="Delete Account" icon="trash" />
      <ProfileOpt label="Logout" icon="log-out" onPress={logout} />
    </View>
  );
};

export default GroupDetails;
