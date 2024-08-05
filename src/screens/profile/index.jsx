import { Dimensions, Share, Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { primary } from "../../utils/common";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { editProfileAPI, logoutAPI, profileAPI } from "../../api/auth";
import Avatar from "../../components/Avatar";
import ProfileOpt from "./ProfileOpt";
import Popup from "../../components/Popup";
import EditProfile from "./EditProfile";
import ChangePwd from "./ChangePwd";
import { ProgressBar } from "rn-inkpad";
import ConfirmLogout from "./ConfirmLogout";
import HiddenGroups from "./HiddenGroups";

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

  const unhide = async (selected) => {
    try {
      const res = await editProfileAPI({
        type: "unhide",
        hiddenGroups: profile.hiddenGroups?.filter(
          (id) => !selected.includes(id)
        ),
      });
      if (res?.status === 200) {
        getProfile();
        setContent(null);
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message);
      else console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = await logoutAPI();
      if (res?.status === 200) {
        await AsyncStorage.clear();
        setContent(null);
        checkLoggedIn();
      }
    } catch (error) {
      console.log(error?.data || error);
    }
  };

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
        value={!profile.monthlyLimit && "Not Set"}
        icon="calendar-number"
        extraValue={
          !!profile.monthlyLimit && (
            <View
              style={tw`mt-2 w-[${
                Dimensions.get("screen").width / 4 - 65
              }] flex flex-row gap-2 items-center`}
            >
              <ProgressBar
                value={(profile.totalExpenses / profile.monthlyLimit) * 100}
                rounded
                progressColor={
                  profile.totalExpenses > profile.monthlyLimit ? "red" : primary
                }
                textColor="#21295C"
              />
              <Text style={tw`font-bold text-xs`}>
                {profile.totalExpenses}/{profile.monthlyLimit}
              </Text>
            </View>
          )
        }
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
        label="Hidden Groups"
        icon="eye-off"
        onPress={() =>
          setContent(
            <HiddenGroups
              setContent={setContent}
              hiddenGroups={profile.hiddenGroups}
              unhide={unhide}
            />
          )
        }
      />
      <ProfileOpt
        label="Logout"
        icon="log-out"
        onPress={() =>
          setContent(<ConfirmLogout setContent={setContent} logout={logout} />)
        }
      />
      {content && <Popup content={content} />}
    </View>
  );
};

export default Profile;
