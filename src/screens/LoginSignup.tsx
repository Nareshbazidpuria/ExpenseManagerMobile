import {
  ActivityIndicator,
  Dimensions,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { emailRegex, primary, screens } from '../utils/global';
import Bicon from '../components/Bicon';
// import CheckBox from 'react-native-check-box';
import { Keyboard } from 'react-native';
import { loginAPI, signupAPI } from '../api/auth';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { CheckBox } from 'rn-inkpad';
import { showToast } from '../utils/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/auth';

const LoginSignup = ({ navigation }) => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state);

  const [signUp, setSignUp] = useState();
  const [showPassword, setShowPassword] = useState();
  const [keyboardVisible, setKeyboardVisible] = useState();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({ email: '', password: '' });

  const validatePayload = () => {
    const errors = {};
    if (signUp) {
      if (!payload.name) errors.name = 'Plaese enter name';
      else if (payload.name.length < 3)
        errors.name = 'Name should be atleast 3 characters long';
      else if (payload.name.length > 20)
        errors.name = 'Name allows maximum 20 characters';
    }
    if (!payload.email) errors.email = 'Plaese enter email';
    else if (!payload.email?.toLowerCase().match(emailRegex))
      errors.email = 'Plaese enter valid email';
    if (!payload.password) errors.password = 'Plaese enter password';
    else if (payload.password.length < 8)
      errors.password = 'Password should be atleast 8 characters long';
    else if (payload.password.length > 30)
      errors.password = 'Password allows maximum 30 characters';
    setError(errors);
    if (Object.values(errors).length) return 1;
  };

  const login = async () => {
    try {
      setLoading(true);
      if (validatePayload()) return;
      const res = signUp ? await signupAPI(payload) : await loginAPI(payload);
      if ([200, 201].includes(res.status)) {
        if (signUp) {
          setSignUp(false);
          showToast('success', res.data?.message || 'Signup successful');
        } else {
          setPayload({ email: '', password: '' });
          await AsyncStorage.setItem(
            'user',
            JSON.stringify(res.data?.data?.user),
          );
          await AsyncStorage.setItem('token', res.data?.data?.accessToken);
          dispatch(setAuthUser(res.data?.data?.user));
        }
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      if (error?.data?.message) showToast('error', error.data.message);
      else console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    if (route?.params?.clear && authUser) {
      route.params.clear = false;
      dispatch(setAuthUser(null));
      await AsyncStorage.clear();
    } else if (authUser) navigation?.navigate(screens.Tabs);
  };

  useEffect(() => {
    checkAuth();
  }, [isFocused, authUser]);

  useEffect(() => {
    if (!signUp) {
      const data = { ...payload };
      delete data.name;
      setPayload(data);
    }
    setError({});
  }, [signUp]);

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
              {signUp ? 'Signup' : 'Login'} to Expense Manager
            </Text>
            <View className={`p-4`}>
              {signUp && (
                <>
                  <Text>Name</Text>
                  <TextInput
                    className={`border-b border-gray-400 `}
                    keyboardType="name-address"
                    value={payload.name}
                    onChangeText={name => setPayload({ ...payload, name })}
                  />
                  <Text className={`text-xs text-red-400`}>{error.name}</Text>
                </>
              )}
              <Text>Email</Text>
              <TextInput
                className={`border-b border-gray-400 `}
                keyboardType="email-address"
                value={payload.email}
                onChangeText={email => setPayload({ ...payload, email })}
              />
              <Text className={`text-xs text-red-400`}>{error.email}</Text>
              <Text>Password</Text>
              <TextInput
                secureTextEntry={!showPassword}
                className={`border-b border-gray-400 `}
                style={{ color: 'black' }}
                value={payload.password}
                onChangeText={password => setPayload({ ...payload, password })}
              />
              <Text className={`text-xs text-red-400`}>{error.password}</Text>
              <CheckBox
                onChange={() => setShowPassword(!showPassword)}
                checked={showPassword}
                iconColor={primary}
                title="Show Password"
                iconSize={24}
              />
              <Text
                className={`font-semibold text-xs text-right`}
                style={{ color: primary }}
              >
                <Text
                  onPress={() =>
                    navigation?.navigate(screens.ForgotPwd, payload?.email)
                  }
                >
                  Forgot password ?
                </Text>
              </Text>
            </View>
            <Bicon
              title={signUp ? 'Signup' : 'Login'}
              cls="w-full"
              txtCls="font-bold text-base"
              onPress={login}
            />
            <Text className={`text-center mt-3`}>
              {signUp ? 'Already' : "Don't"} have an account ?&nbsp;
              <Text
                onPress={() => setSignUp(!signUp)}
                className={`font-semibold`}
                style={{ color: primary }}
              >
                {signUp ? 'Login' : 'Signup'}
              </Text>
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default LoginSignup;
