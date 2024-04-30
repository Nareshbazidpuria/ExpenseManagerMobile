import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import tw from "twrnc";
import Bicon from "./Bicon";
import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { primary, users } from "../utils/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginAPI } from "../api/apis";
// import { removeNotificationSubscription } from "expo-notifications";

const SelectProfile = ({ setRefresh }) => {
  // const notificationListener = useRef();
  // const responseListener = useRef();
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const [changePass, setChangePass] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    password: "",
    expoToken: "",
  });

  const checkVisible = async () => {
    setVisible(!(await AsyncStorage.getItem("user")));
  };

  const login = async () => {
    try {
      setLoading(true);
      const res = await loginAPI({ ...payload, changePass });
      if (res.status === 200) {
        if (res.data?.changePass) {
          setChangePass(true);
          setPayload({ ...payload, password: "" });
        } else {
          await AsyncStorage.setItem("user", JSON.stringify(res.data?.user));
          if (setRefresh) setRefresh(Date.now());
          setPayload({});
          checkVisible();
          setChangePass(false);
        }
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkVisible();
  }, []);

  // useEffect(() => {
  //   registerPush().then((token) => {
  //     setPayload({ ...payload, expoToken: token?.data });
  //   });

  //   return () => {
  //     removeNotificationSubscription(notificationListener.current);
  //     removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={tw`bg-[${primary}] flex items-center pt-[${200}] h-[${
          Dimensions.get("screen").height / 4
        }]`}
      >
        <View style={tw`bg-white w-72 p-4 rounded shadow`}>
          {loading ? (
            <ActivityIndicator color={primary} size={50} />
          ) : changePass ? (
            <>
              <Text style={tw`text-lg font-semibold text-center mb-2`}>
                Set new secret key
              </Text>
              <Text style={tw`text-base font-semibold`}>
                Enter new secret key
              </Text>
              <TextInput
                style={tw`border-b border-gray-400 mb-4`}
                value={payload.password}
                onChangeText={(password) =>
                  setPayload({ ...payload, password })
                }
              />
              <Bicon
                title={changePass ? "Set" : "Login"}
                cls="w-full"
                onPress={login}
              />
            </>
          ) : payload.name ? (
            <>
              <Text style={tw`text-base font-semibold`}>
                Enter your secret key
              </Text>
              <TextInput
                style={tw`border-b border-gray-400 mb-4`}
                value={payload.password}
                onChangeText={(password) =>
                  setPayload({ ...payload, password })
                }
              />
              <Bicon title="Login" cls="w-full" onPress={login} />
            </>
          ) : (
            <>
              <Text style={tw`text-lg text-center font-semibold mb-2`}>
                Select your profile
              </Text>
              {users.map((name) => (
                <ProfileCard
                  name={name}
                  key={name}
                  value={name}
                  onPress={() => setPayload({ ...payload, name })}
                />
              ))}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SelectProfile;
