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
import { emailRegex, primary } from "../../utils/common";
import Bicon from "../../components/Bicon";
import { Keyboard } from "react-native";
import { forgotPwdAPI, resetPwdAPI } from "../../api/auth";
import CheckBox from "react-native-check-box";
// import OTPTextInput from "react-native-otp-textinput";

const ForgotPwd = ({ route, navigation }) => {
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);

  const [otpSent, setOtpSent] = useState();
  const [keyboardVisible, setKeyboardVisible] = useState();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState();
  const [showPassword, setShowPassword] = useState();
  const [payload, setPayload] = useState({ email: route?.params || "" });

  const validatePayload = () => {
    const errors = {};
    if (otpSent) {
      if (!payload.otp || payload.otp.length !== 6)
        errors.otp = "Plaese enter OTP";
      if (!payload.password) errors.password = "Plaese enter password";
      else if (payload.password.length < 8)
        errors.password = "Password should be atleast 8 characters long";
      else if (payload.password.length > 30)
        errors.password = "Password allows maximum 30 characters";
    } else {
      if (!payload.email) errors.email = "Plaese enter email";
      else if (!payload.email?.toLowerCase().match(emailRegex))
        errors.email = "Plaese enter valid email";
    }
    setError(errors);
    if (Object.values(errors).length) return 1;
  };

  const reset = async () => {
    try {
      setLoading(true);
      if (validatePayload()) return;
      const res = otpSent
        ? await resetPwdAPI(payload)
        : await forgotPwdAPI(payload);
      if (res.status === 200) {
        if (!otpSent) {
          setOtpSent(true);
          setPayload({ token: res.data?.data });
        } else navigation.navigate("Login");
        message(res.data?.message);
      }
    } catch (error) {
      if (error?.data?.message)
        setError({ [otpSent ? "otp" : "email"]: error.data.message });
      else console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        keyboardVisible ? 150 : otpSent ? 180 : 220
      }] h-[${Dimensions.get("screen").height / 4}]`}
    >
      <View style={tw`bg-white w-[90%] p-4 rounded shadow`}>
        {loading ? (
          <ActivityIndicator color={primary} size={50} />
        ) : (
          <>
            <Text style={tw`text-lg text-center font-semibold mb-2`}>
              {otpSent ? "Reset Password" : "Forgot Password"}
            </Text>
            <View style={tw`p-4`}>
              {otpSent ? (
                <>
                  <Text>Enter OTP</Text>
                  {/* <OTPTextInput
                    defaultValue={payload.otp}
                    inputCount={6}
                    textInputStyle={tw`w-8`}
                    tintColor={primary}
                    handleTextChange={(otp) => setPayload({ ...payload, otp })}
                  /> */}
                  <TextInput
                    value={payload.otp}
                    style={tw`border-b border-gray-400 `}
                    onChangeText={(otp) => setPayload({ ...payload, otp })}
                  />
                  <Text style={tw`text-xs text-red-400`}>{error.otp}</Text>
                  <Text>Enter new password</Text>
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
                </>
              ) : (
                <>
                  <Text>Email</Text>
                  <TextInput
                    style={tw`border-b border-gray-400 `}
                    keyboardType="email-address"
                    value={payload.email}
                    onChangeText={(email) => setPayload({ ...payload, email })}
                  />
                  <Text style={tw`text-xs text-red-400`}>{error.email}</Text>
                </>
              )}
            </View>
            <Bicon
              title={otpSent ? "Reset" : "Request OTP"}
              cls="w-full"
              txtCls="font-bold text-base"
              onPress={reset}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default ForgotPwd;
