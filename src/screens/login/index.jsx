import {
  ActivityIndicator,
  Dimensions,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import tw from "twrnc";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { emailRegex, primary } from "../../utils/common";
import Bicon from "../../components/Bicon";
import CheckBox from "react-native-check-box";
import { Keyboard } from "react-native";
import { loginAPI, signupAPI } from "../../api/auth";
import { useIsFocused } from "@react-navigation/native";

const LoginSignup = ({ navigation }) => {
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const isFocused = useIsFocused();

  const [signUp, setSignUp] = useState();
  const [showPassword, setShowPassword] = useState();
  const [keyboardVisible, setKeyboardVisible] = useState();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({ email: "", password: "" });

  const validatePayload = () => {
    const errors = {};
    if (signUp) {
      if (!payload.name) errors.name = "Plaese enter name";
      else if (payload.name.length < 3)
        errors.name = "Name should be atleast 3 characters long";
      else if (payload.name.length > 20)
        errors.name = "Name allows maximum 20 characters";
    }
    if (!payload.email) errors.email = "Plaese enter email";
    else if (!payload.email?.toLowerCase().match(emailRegex))
      errors.email = "Plaese enter valid email";
    if (!payload.password) errors.password = "Plaese enter password";
    else if (payload.password.length < 8)
      errors.password = "Password should be atleast 8 characters long";
    else if (payload.password.length > 30)
      errors.password = "Password allows maximum 30 characters";
    setError(errors);
    if (Object.values(errors).length) return 1;
  };

  const login = async () => {
    try {
      setLoading(true);
      if (validatePayload()) return;
      const res = signUp ? await signupAPI(payload) : await loginAPI(payload);
      if ([200, 201].includes(res.status)) {
        if (signUp) setSignUp(false);
        else {
          setPayload({});
          await AsyncStorage.setItem(
            "user",
            JSON.stringify(res.data?.data?.user)
          );
          await AsyncStorage.setItem("token", res.data?.data?.accessToken);
          navigation.navigate("Home");
        }
        message(res.data?.message);
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message);
      else console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const checkLoggedIn = async () => {
    const loggedIn = await AsyncStorage.getItem("user");
    if (loggedIn) navigation?.navigate("Home");
  };

  useEffect(() => {
    checkLoggedIn();
  }, [isFocused]);

  useEffect(() => {
    if (!signUp) {
      const data = { ...payload };
      delete data.name;
      setPayload(data);
    }
    setError({});
  }, [signUp]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(1));
    Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(0));
    return () => {
      Keyboard.removeAllListeners("");
    };
  }, []);

  return (
    <View
      style={tw`bg-[${primary}] flex items-center pt-[${
        keyboardVisible ? 50 : signUp ? 180 : 200
      }] h-[${Dimensions.get("screen").height / 4}]`}
    >
      <View style={tw`bg-white w-[90%] p-4 rounded shadow`}>
        {loading ? (
          <ActivityIndicator color={primary} size={50} />
        ) : (
          <>
            <Text style={tw`text-lg text-center font-semibold mb-2`}>
              {signUp ? "Signup" : "Login"} to Expense Manager
            </Text>
            <View style={tw`p-4`}>
              {signUp && (
                <>
                  <Text>Name</Text>
                  <TextInput
                    style={tw`border-b border-gray-400 `}
                    keyboardType="name-address"
                    value={payload.name}
                    onChangeText={(name) => setPayload({ ...payload, name })}
                  />
                  <Text style={tw`text-xs text-red-400`}>{error.name}</Text>
                </>
              )}
              <Text>Email</Text>
              <TextInput
                style={tw`border-b border-gray-400 `}
                keyboardType="email-address"
                value={payload.email}
                onChangeText={(email) => setPayload({ ...payload, email })}
              />
              <Text style={tw`text-xs text-red-400`}>{error.email}</Text>
              <Text>Password</Text>
              <TextInput
                secureTextEntry={!showPassword}
                style={tw`border-b border-gray-400 `}
                value={payload.password}
                onChangeText={(password) =>
                  setPayload({ ...payload, password })
                }
              />
              <Text style={tw`text-xs text-red-400`}>{error.password}</Text>
              <CheckBox
                onClick={() => setShowPassword(!showPassword)}
                isChecked={showPassword}
                checkedCheckBoxColor={primary}
                checkBoxColor={primary}
                rightText="Show Password"
              />
            </View>
            <Bicon
              title={signUp ? "Signup" : "Login"}
              cls="w-full"
              txtCls="font-bold text-base"
              onPress={login}
            />
            <Text style={tw`text-center mt-3`}>
              {signUp ? "Already" : "Don't"} have an account ?&nbsp;
              <Text
                onPress={() => setSignUp(!signUp)}
                style={tw`text-[${primary}] font-semibold`}
              >
                {signUp ? "Login" : "Signup"}
              </Text>
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default LoginSignup;
