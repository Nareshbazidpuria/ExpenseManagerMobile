import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import TopBar from '../components/TopBar';
import Bicon from '../components/Bicon';
import Avatar from '../components/Avatar';
import { primary, screens } from '../utils/global';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { addFriendAPI, getMemberAPI } from '../api/group';
import { message } from '../utils/common';

interface User {
  _id: string;
  name: string;
}

export default function AddFriendScreen({ navigation }: { navigation: any }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const formatCode = (text: string) => {
    const cleaned = text.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    return cleaned.slice(0, 11);
  };

  const fetchUser = async (connectionCode: string) => {
    try {
      setLoading(true);
      setError(null);
      setUser(null);
      const res = await getMemberAPI({ secretCode: connectionCode });
      if (res?.status === 200) setUser(res.data.data);
      else
        setError(
          res?.data?.message ||
            'User not found. Please check the code and try again.',
        );
    } catch (err: any) {
      setError(
        err?.data?.message ||
          'User not found. Please check the code and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code.length === 11) {
      fetchUser(code);
    } else {
      setUser(null);
      setError(null);
    }
  }, [code]);

  const addFriend = async () => {
    try {
      setConnecting(true);
      if (!user) return;
      const res = await addFriendAPI(user._id);
      if (res?.status === 200) {
        message(res?.data?.message || 'Friend added successfully');
        setUser(null);
        setCode('');
        navigation?.navigate(screens.Tabs);
      } else res?.data?.message && setError(res?.data?.message);
    } catch (err: any) {
      console.log(err);
      if (err?.data?.message) setError(err.data.message);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <>
      <TopBar name="Add Friend" />
      <KeyboardAvoidingView
        className="flex-1 bg-gray-50"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 p-6">
          <View className="items-center mb-8">
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ backgroundColor: primary, borderRadius: 9999 }}
              className="w-24 h-24 items-center justify-center mb-4"
            >
              <IonIcon name="person-add-outline" size={48} color="#ffffff" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-3">
              Add a Friend
            </Text>
            <Text className="text-base text-gray-500 text-center leading-6 px-2">
              Ask your friend for their connection code to add them. They can
              find it in their profile under "My Connection Code".
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Connection Code
            </Text>
            <TextInput
              className="border-b border-gray-400"
              value={code}
              onChangeText={text => setCode(formatCode(text))}
              placeholder="Enter 11-digit code"
              placeholderTextColor="#9ca3af"
              maxLength={11}
              autoCapitalize="characters"
              autoCorrect={false}
              editable={!loading}
            />
            <Text className="text-sm text-gray-400 mt-1">
              {code.length}/11 characters
            </Text>
          </View>

          {loading && (
            <View className="items-center py-8">
              <ActivityIndicator size="large" color={primary} />
              <Text className="mt-3 text-base text-gray-500">
                Finding user...
              </Text>
            </View>
          )}

          {error && (
            <View className="flex-row items-center bg-red-100 p-4 rounded-xl space-x-3">
              <IonIcon name="alert-circle-outline" size={20} color="#ef4444" />
              <Text className="flex-1 text-sm text-red-600 leading-5 ml-1">
                {error}
              </Text>
            </View>
          )}

          {user && !loading && (
            <View className="bg-white rounded-2xl p-5 shadow-md">
              <View className="flex-row items-center gap-3 mb-5">
                <Avatar value={user.name} />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    {user.name}
                  </Text>
                  <Text className="text-sm text-gray-500">{code}</Text>
                </View>
              </View>
              <Bicon
                cls="mt-4"
                title="Connect"
                loading={connecting}
                disabled={connecting}
                onPress={addFriend}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
