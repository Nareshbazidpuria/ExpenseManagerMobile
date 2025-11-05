import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Image, Dimensions } from 'react-native';
import { screens } from '../utils/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setAuthUser } from '../redux/auth';
import logo from '../assets/logo.png';
import { primary } from '../utils/global';

const SplashScreen: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.authUser);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const checkLoggedIn = async () => {
    if (!authUser) {
      const loggedIn = await AsyncStorage.getItem('user');
      if (!loggedIn) return navigation.replace(screens.Login);
      else dispatch(setAuthUser(JSON.parse(loggedIn)));
    }
    return navigation.replace(screens.Tabs);
  };

  useEffect(() => {
    // Sequential animations for a polished effect
    Animated.sequence([
      // Logo scale and fade in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // Text slide up and fade in
      Animated.parallel([
        Animated.timing(textFadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(checkLoggedIn, 1400); // Navigate after 1.4 seconds Splash animation
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      className="flex-1 justify-center items-center gap-28"
      style={{ backgroundColor: primary }}
    >
      <View className="flex justify-center items-center h-96">
        {/* Animated background circles for depth */}
        <Animated.View
          className="absolute bg-white rounded-full opacity-20"
          style={{
            transform: [{ scale: scaleAnim }],
            width: Dimensions.get('window').width * 0.9,
            height: Dimensions.get('window').width * 0.9,
          }}
        />
        <Animated.View
          className="absolute bg-white rounded-full opacity-30"
          style={{
            transform: [{ scale: scaleAnim }],
            width: Dimensions.get('window').width * 0.6,
            height: Dimensions.get('window').width * 0.6,
          }}
        />

        {/* Main content container */}
        <Animated.View
          className="absolute items-center"
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Image
            source={logo}
            className="rounded-full"
            style={{
              width: Dimensions.get('screen').width * 0.3,
              height: Dimensions.get('screen').width * 0.3,
            }}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          opacity: textFadeAnim,
        }}
      >
        <Text className="text-white text-4xl font-bold mb-2 text-center">
          Expense Manager
        </Text>
        <Text className="text-green-100 text-lg text-center font-medium">
          Track • Save • Grow
        </Text>
      </Animated.View>

      {/* Subtle bottom text */}
      <Animated.View
        className="absolute bottom-8"
        style={{
          opacity: textFadeAnim,
        }}
      >
        <Text className="text-green-100 text-sm font-medium">
          Your Financial Journey Starts Here
        </Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
