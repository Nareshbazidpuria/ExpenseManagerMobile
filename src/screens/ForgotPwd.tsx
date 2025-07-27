import {
  ActivityIndicator,
  Dimensions,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { emailRegex, primary } from '../utils/global';
import Bicon from '../components/Bicon';
import { Keyboard } from 'react-native';
import { forgotPwdAPI, resetPwdAPI } from '../api/auth';
import { CheckBox } from 'rn-inkpad';
import { showToast } from '../utils/Toast';
// import OTPTextInput from "react-native-otp-textinput";

const ForgotPwd = ({ route, navigation }) => {
  const [otpSent, setOtpSent] = useState();
  const [keyboardVisible, setKeyboardVisible] = useState();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState();
  const [showPassword, setShowPassword] = useState();
  const [payload, setPayload] = useState({ email: route?.params || '' });

  const validatePayload = () => {
    const errors = {};
    if (otpSent) {
      if (!payload.otp || payload.otp.length !== 6)
        errors.otp = 'Plaese enter OTP';
      if (!payload.password) errors.password = 'Plaese enter password';
      else if (payload.password.length < 8)
        errors.password = 'Password should be atleast 8 characters long';
      else if (payload.password.length > 30)
        errors.password = 'Password allows maximum 30 characters';
    } else {
      if (!payload.email) errors.email = 'Plaese enter email';
      else if (!payload.email?.toLowerCase().match(emailRegex))
        errors.email = 'Plaese enter valid email';
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
        } else navigation.navigate('Login');
        showToast('success', res.data?.message);
      }
    } catch (error) {
      if (error?.data?.message)
        setError({ [otpSent ? 'otp' : 'email']: error.data.message });
      else console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(1));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(0));
    return () => {
      Keyboard.removeAllListeners('');
    };
  }, []);

  return (
    <View
      className={`flex-1 items-center`}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: primary,
        [keyboardVisible ? 'paddingTop' : 'justifyContent']: keyboardVisible
          ? Dimensions.get('screen').height / 10
          : 'center',
        paddingBottom: keyboardVisible ? 0 : 50,
      }}
    >
      <View className={`bg-white w-[90%] p-4 rounded shadow`}>
        {loading ? (
          <ActivityIndicator color={primary} size={50} />
        ) : (
          <>
            <Text className={`text-lg text-center font-semibold mb-2`}>
              {otpSent ? 'Reset Password' : 'Forgot Password'}
            </Text>
            <View className={`p-4`}>
              {otpSent ? (
                <>
                  <Text>Enter OTP</Text>
                  {/* <OTPTextInput
                    defaultValue={payload.otp}
                    inputCount={6}
                    className={`w-8`}
                    tintColor={primary}
                    handleTextChange={(otp) => setPayload({ ...payload, otp })}
                  /> */}
                  <TextInput
                    value={payload.otp}
                    className={`border-b border-gray-400 `}
                    onChangeText={otp => setPayload({ ...payload, otp })}
                  />
                  <Text className={`text-xs text-red-400`}>{error.otp}</Text>
                  <Text>Enter new password</Text>
                  <TextInput
                    secureTextEntry={!showPassword}
                    className={`border-b border-gray-400 `}
                    value={payload.password}
                    onChangeText={password =>
                      setPayload({ ...payload, password })
                    }
                  />
                  <Text className={`text-xs text-red-400`}>
                    {error.password}
                  </Text>
                  <CheckBox
                    onChange={() => setShowPassword(!showPassword)}
                    checked={showPassword}
                    iconColor={primary}
                    title="Show Password"
                    iconSize={24}
                  />
                </>
              ) : (
                <>
                  <Text>Email</Text>
                  <TextInput
                    className={`border-b border-gray-400 `}
                    keyboardType="email-address"
                    value={payload.email}
                    onChangeText={email => setPayload({ ...payload, email })}
                  />
                  <Text className={`text-xs text-red-400`}>{error.email}</Text>
                </>
              )}
            </View>
            <Bicon
              title={otpSent ? 'Reset' : 'Request OTP'}
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
