import { Pressable, Share, Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { primary } from "../../utils/common";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutAPI, profileAPI } from "../../api/auth";
import Avatar from "../../components/Avatar";
import ProfileOpt from "./ProfileOpt";
import Popup from "../../components/Popup";
import EditProfile from "./EditProfile";
import ChangePwd from "./ChangePwd";
import Bicon from "../../components/Bicon";

const Profile = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState({});
  const [content, setContent] = useState();

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

  const confirmLogout = (
    <View style={tw`p-2`}>
      <Text style={tw`text-center font-bold text-lg my-5`}>
        Are you sure you want to logout ?
      </Text>
      <View style={tw`flex flex-row justify-between mt-2`}>
        <Bicon
          title="No"
          cls="w-[48%]"
          bg="#ffffff"
          txtCls="font-bold text-base"
          onPress={() => setContent(null)}
        />
        <Bicon
          title="Yes"
          cls="w-[48%]"
          txtCls="font-bold text-base"
          onPress={logout}
        />
      </View>
    </View>
  );

  const share = async (name, secretCode) => {
    try {
      await Share.share({
        message: `${name}'s secret code is - ${secretCode}`,
      });
    } catch (error) {}
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
        <Text style={tw`text-2xl text-white font-semibold`}>Profile</Text>
        <IonIcon
          name="pencil"
          size={20}
          color="white"
          onPress={() =>
            setContent(
              <EditProfile
                profile={profile}
                cancel={() => {
                  setContent(null);
                  getProfile();
                }}
              />
            )
          }
        />
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
        onPress={() => share(profile.name, profile.secretCode)}
      />
      <ProfileOpt
        label="Monthly Expense Limit"
        value={profile.monthlyLimit || "Not Set"}
        icon="calendar-number"
      />
      <ProfileOpt
        label="Notifications"
        icon="notifications"
        onPress={() => navigation?.navigate("Notifications")}
        extra={
          !!profile?.unreadAlertsCount && (
            <Text
              style={tw`font-bold text-xs bg-[${primary}] px-1.5 py-.5 rounded-full text-white`}
            >
              {profile?.unreadAlertsCount}
            </Text>
          )
        }
      />
      <ProfileOpt
        label="Change Password"
        icon="key"
        onPress={() =>
          setContent(<ChangePwd cancel={() => setContent(null)} />)
        }
      />
      <ProfileOpt
        label="Delete Account"
        icon="trash"
        onPress={() => alert("Not available yet")}
      />
      <ProfileOpt
        label="Logout"
        icon="log-out"
        onPress={() => setContent(confirmLogout)}
      />
      {content && <Popup content={content} />}
    </View>
  );
};

export default Profile;
