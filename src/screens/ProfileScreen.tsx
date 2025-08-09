import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Alert,
  Dimensions,
  ActivityIndicator,
  Share,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { editProfileAPI, logoutAPI, profileAPI } from '../api/auth';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { ProgressBar } from 'rn-inkpad';
import Avatar from '../components/Avatar';
import ProfileOpt from '../components/ProfileOpt';
import HiddenGroups from '../components/HiddenGroups';
import Options from '../components/Options';
import ChangePwd from '../components/ChangePwd';
import ConfirmLogout from '../components/ConfirmLogout';
import Popup from '../components/Popup';
import { primary, screens } from '../utils/global';
import TopBar from '../components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../redux/store';

type Props = { navigation: any };

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const message = (msg: string) => ToastAndroid.show(msg, ToastAndroid.LONG),
    isFocused = useIsFocused(),
    [profile, setProfile] = useState({}),
    [content, setContent] = useState(),
    [loading, setLoading] = useState<boolean>(false),
    dispatch = useDispatch(),
    authUser = useSelector((state: RootState) => state.authUser);

  const getProfile = async () => {
    try {
      setLoading(true);
      const res = await profileAPI();
      if (res?.status === 200) {
        setProfile(res.data?.data);
        dispatch(setAuthUser(res.data?.data));
        // await AsyncStorage.setItem('user', JSON.stringify(res.data.data));
      }
    } catch (error) {
      // console.log(error?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const editProfile = async data => {
    try {
      const res = await editProfileAPI(data);
      if (res?.status === 200) {
        getProfile();
        setContent(null);
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message);
      // else console.log(error);
    }
  };

  const unhide = async selected => {
    try {
      const res = await editProfileAPI({
        type: 'unhide',
        hiddenGroups: profile.hiddenGroups?.filter(
          id => !selected.includes(id),
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
        dispatch(setAuthUser(null));
      }
    } catch (error) {
      console.log(error?.data || error);
    }
  };

  const share = async message => {
    try {
      await Share.share({ message });
    } catch (error) {}
  };

  useEffect(() => {
    getProfile();
  }, [isFocused]);

  useEffect(() => {
    !authUser && navigation?.navigate(screens.Login);
  }, [authUser]);

  return (
    <View>
      <TopBar name="My Profile" />
      {loading ? (
        <View
          className={`fle items-center justify-center bg-[#f2f2f2]`}
          style={{ height: Dimensions.get('window').height - 100 }}
        >
          <ActivityIndicator size="large" color={primary} />
        </View>
      ) : (
        <>
          <View
            className={`p-5 pr-3 flex flex-row items-center gap-4 justify-between border-b border-gray-300 `}
          >
            <View className="flex flex-row gap-3 items-center max-w-[70%]">
              <Avatar value={profile.name || ''} w={70} />
              <View className="max-w-[80%]">
                <Text className={`text-lg font-bold`}>{profile.name}</Text>
                <Text>{profile.email}</Text>
              </View>
            </View>
            <View className="flex flex-row gap-3 items-center">
              <IonIcon
                name="qr-code"
                size={24}
                style={{ color: primary }}
                onPress={() => navigation?.navigate(screens.QR, { profile })}
              />
              <IonIcon
                name="pencil"
                size={20}
                style={{ color: primary }}
                // onPress={() =>
                //   setContent(<EditProfile profile={profile} editProfile={editProfile} />)
                // }
              />
            </View>
          </View>
          <ProfileOpt
            label="Secret Code"
            value={profile.secretCode}
            icon="lock-closed"
            onPress={() => share(profile.secretCode)}
          />
          <ProfileOpt
            label="Monthly Expense Limit"
            value={!profile.monthlyLimit && 'Not Set'}
            icon="calendar-number"
            extraValue={
              !!profile.monthlyLimit && (
                <View
                  className={`mt-2 flex flex-row gap-2 items-center`}
                  style={{ width: Dimensions.get('window').width - 170 }}
                >
                  <ProgressBar
                    value={(profile.totalExpenses / profile.monthlyLimit) * 100}
                    rounded
                    height={profile.email === 'bishth666@gmail.com' ? 5 : 12}
                    progressColor={
                      profile.totalExpenses > profile.monthlyLimit
                        ? 'red'
                        : primary
                    }
                    textColor="#21295C"
                  />
                  <Text className={`font-bold text-xs`}>
                    {profile.totalExpenses}/{profile.monthlyLimit}
                  </Text>
                </View>
              )
            }
          />
          <ProfileOpt
            label="Notifications"
            icon="notifications"
            onPress={() => navigation?.navigate(screens.Notifications)}
            extra={
              !!profile?.unreadAlertsCount && (
                <Text
                  className={`font-bold text-xs bg-[${primary}] px-1.5 py-.5 rounded-full text-white`}
                >
                  {profile?.unreadAlertsCount}
                </Text>
              )
            }
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
                />,
              )
            }
          />
          <ProfileOpt
            label="Customize Expense Options"
            icon="options"
            onPress={() =>
              setContent(
                <Options
                  setContent={setContent}
                  options={profile.options}
                  update={editProfile}
                />,
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
            onPress={() => Alert('Not available yet')}
          />
          <ProfileOpt
            label="Logout"
            icon="log-out"
            onPress={() =>
              setContent(
                <ConfirmLogout setContent={setContent} logout={logout} />,
              )
            }
          />
        </>
      )}
      {content && <Popup content={content} height={130} width={330} />}
    </View>
  );
};

export default ProfileScreen;
